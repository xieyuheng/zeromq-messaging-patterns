import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"

type Options = {
  serverAddress: string
  timeout: number // ms
  retries: number
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
    await client.send(request)

    while (true) {
      log({ who, message: "expecting reply" })
      try {
        client.receiveTimeout = timeout
        const [receivedSequence, reply] = await client.receive()
        if (Number(receivedSequence) === sequence) {
          log({
            who,
            message: "ok",
            sequence,
            reply: String(reply),
          })
          retriesLeft = retries
          break
        }

        log({
          who,
          kind: "Error",
          message: "received wrong sequence",
          sequence,
          receivedSequence: String(receivedSequence),
          reply: String(reply),
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

        await client.send(request)
      }
    }
  }
}
