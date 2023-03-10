import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import { wait } from "../utils/wait"

type Options = {
  frontendAddress: string
}

export async function startClient(options: Options) {
  const { frontendAddress } = options

  const who = "client"

  const client = new Zmq.Dealer()
  const id = randomHexString(4)
  client.routingId = id
  client.connect(frontendAddress)

  log({ who, message: "started", id })

  while (true) {
    const task = `task ${randomHexString(4)}`
    await client.send(task)

    const [reply] = await client.receive()

    log({ who, id, reply: String(reply) })

    await wait(500)
  }
}
