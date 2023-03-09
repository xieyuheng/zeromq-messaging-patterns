import * as Zmq from "zeromq"

type Options = {
  address: string
  workersNumber: number
}

export async function startBroker(options: Options) {
  const { address, workersNumber } = options

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
