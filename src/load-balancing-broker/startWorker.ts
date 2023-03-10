import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import { wait } from "../utils/wait"

type Options = {
  backendAddress: string
}

export async function startWorker(options: Options) {
  const { backendAddress } = options

  const who = "worker"

  const worker = new Zmq.Dealer()

  const id = randomHexString(4)
  worker.routingId = id
  worker.connect(backendAddress)

  log({ who, message: "started", id })

  // receive: [...request]
  // send: ["Ready"] | ["Reply", ...request]

  await worker.send(["Ready"])

  log({ who, id, message: "ready" })

  while (true) {
    const [clientId, task] = await worker.receive()

    log({
      who,
      id,
      message: "working on task",
      clientId: String(clientId),
      task: String(task),
    })

    await wait(300)

    const reply = `${task}, reply ${randomHexString(4)}`
    await worker.send(["Reply", clientId, reply])
  }
}
