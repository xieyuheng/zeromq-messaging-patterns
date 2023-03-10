import * as Zmq from "zeromq"

type Options = {
  address: string
  workersNumber: number
}

export async function startBroker(options: Options) {
  const { address, workersNumber } = options

  const broker = new Zmq.Router()

  const who = "broker"

  await broker.bind(address)

  console.log({ who, message: "started" })

  let workersFired = 0
  const endTime = Date.now() + 5000
  while (true) {
    //  Next message gives us least recently used worker.
    const [id, delimiter, reply] = await broker.receive()

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
