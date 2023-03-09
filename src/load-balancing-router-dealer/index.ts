import * as Zmq from "zeromq"
import { randomNat } from "../utils/randomNat"
import { repeatedly } from "../utils/repeatedly"
import { wait } from "../utils/wait"

async function runWorker() {
  const worker = new Zmq.Dealer()

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
    const [id, result] = await broker.receive()

    if (Date.now() < endTime) {
      await broker.send([id, "Work harder"])
    } else {
      await broker.send([id, "Fired!"])
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

  /**

     However, remember the reason for that empty delimiter frame: it’s
     to allow multihop extended requests that terminate in a REP
     socket, which uses that delimiter to split off the reply envelope
     so it can hand the data frames to its application.

     If we never need to pass the message along to a REP socket, we
     can simply drop the empty delimiter frame at both sides, which
     makes things simpler. This is usually the design I use for pure
     DEALER to ROUTER protocols.

  **/

  const workersNumber = 10

  runBroker(workersNumber)
  repeatedly(workersNumber, () => {
    runWorker()
  })
}

run()