import * as Zmq from "zeromq"
import { randomNat } from "../utils/randomNat"
import { wait } from "../utils/wait"

type Options = {
  address: string
}

export async function startWorker(options: Options) {
  const { address } = options

  const worker = new Zmq.Request()

  const who = "worker"

  worker.connect("tcp://127.0.0.1:3000")

  let total = 0
  while (true) {
    await worker.send("Hi Boss")

    const [task] = await worker.receive()
    if (String(task) === "Fired!") {
      console.log(`Completed: ${total} tasks`)
      break
    }

    total++
    await wait(randomNat(500))
  }
}
