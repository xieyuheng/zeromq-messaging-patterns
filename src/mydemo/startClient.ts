import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import { randomNat } from "../utils/randomNat"

type Options = {
  serverAddress: string
  timeout: number // ms
  retries: number
}

function randomServiceName(names: Array<string>): string {
  const index = randomNat(names.length)
  return names[index]
}

export async function startClient(options: Options): Promise<void> {
  const { serverAddress, timeout, retries } = options

  const who = "client"

  const client = new Zmq.Dealer()
  client.connect(serverAddress)

  log({ who, message: "started" })

  let sequence = 0
  let retriesLeft = retries
  while (retriesLeft > 0) {
    const payload = randomHexString(4)
    const request = [String(++sequence), payload]
    const serviceName = randomServiceName(["Water", "Coffee", "Tea"])
    await client.send(["Request", serviceName, ...request])

    while (true) {
      log({ who, message: "expecting reply", serviceName })
      try {
        client.receiveTimeout = timeout
        const [kind, receivedServiceName, receivedSequence, ...reply] =
          await client.receive()

        if (String(receivedServiceName) !== serviceName) {
          log({
            who,
            kind: "Error",
            message: "serviceName mismatch",
            serviceName,
            receivedServiceName: String(receivedServiceName),
          })
          continue
        }

        if (String(kind) !== "Reply") {
          log({
            who,
            kind: "Error",
            message: "unknown message kind",
            messageKind: String(kind),
          })
          continue
        }

        if (Number(receivedSequence) === sequence) {
          log({
            who,
            message: "ok",
            sequence,
            serviceName: String(serviceName),
            reply: reply.map(String),
          })
          retriesLeft = retries
          break
        }

        log({
          who,
          kind: "Error",
          message: "received wrong sequence",
          sequence,
          serviceName: String(serviceName),
          receivedSequence: String(receivedSequence),
          reply: reply.map(String),
        })
      } catch (error) {
        // TODO only catch timeout error
        if (--retriesLeft === 0) {
          log({
            who,
            kind: "Error",
            message: "Server seems to be offline, abandoning",
          })

          return
        }

        log({
          who,
          kind: "Warning",
          message: "no response from server, retrying...",
        })

        await client.send(["Request", serviceName, ...request])
      }
    }
  }
}
