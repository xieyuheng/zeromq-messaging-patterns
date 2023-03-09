import * as Zmq from "zeromq"
import { randomNat } from "../utils/randomNat"
import { repeatedly } from "../utils/repeatedly"
import { wait } from "../utils/wait"

async function runWorker() {
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

async function runBroker(workersNumber: number) {
  const broker = new Zmq.Router()

  const who = "broker"

  await broker.bind("tcp://127.0.0.1:3000")

  console.log({ who, message: "started" })

  let workersFired = 0
  const endTime = Date.now() + 5000
  while (true) {
    //  Next message gives us least recently used worker.
    const [id, delimiter, result] = await broker.receive()

    if (Date.now() < endTime) {
      await broker.send([id, delimiter, "Work harder"])
    } else {
      await broker.send([id, delimiter, "Fired!"])
      workersFired++
      if (workersFired === workersNumber) {
        break
      }
    }
  }
}

async function run() {
  /**
     The example runs for five seconds and then each worker prints how
     many tasks they handled. If the routing worked, we’d expect a
     fair distribution of work.
  **/

  const workersNumber = 10

  runBroker(workersNumber)
  repeatedly(workersNumber, () => {
    runWorker()
  })
}

run()
