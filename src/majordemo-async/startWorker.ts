import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import { randomNat } from "../utils/randomNat"
import { wait } from "../utils/wait"

type Options = {
  backendAddress: string
  overloadDelay: number
  workDelay: number
}

export async function startWorker(options: Options) {
  const { backendAddress, overloadDelay, workDelay } = options

  const who = "worker"

  const worker = new Zmq.Dealer()

  const id = randomHexString(4)
  worker.routingId = id
  worker.connect(backendAddress)

  log({ who, id, message: "started" })

  // worker.receive: [...request]
  // worker.send: ["Ready"] | ["Reply", ...reply]

  await worker.send(["Ready"])

  log({ who, id, message: "ready" })

  let cycles = 0
  while (true) {
    const request = await worker.receive()
    cycles++

    //  Simulate various problems, after a few cycles
    if (cycles > 3) {
      if (randomNat(20) === 0) {
        log({ who, id, kind: "Error", message: "simulating a crash" })
        return
      }

      if (randomNat(3) === 0) {
        log({ who, id, kind: "Warning", message: "simulating CPU overload" })
        await wait(overloadDelay)
      }
    }

    log({ who, id, message: "working" })
    //  Pretend to work
    await wait(workDelay)
    await worker.send(["Reply", ...request])
  }
}
