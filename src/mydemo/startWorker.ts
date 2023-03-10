import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import { randomNat } from "../utils/randomNat"
import { wait } from "../utils/wait"

type Options = {
  serviceName: string
  backendAddress: string
  overloadDelay: number
  workDelay: number
}

export async function startWorker(options: Options) {
  const { serviceName, backendAddress, overloadDelay, workDelay } = options

  const who = "worker"

  const worker = new Zmq.Dealer()

  const id = randomHexString(4)
  worker.routingId = id
  worker.connect(backendAddress)

  log({ who, id, message: "started", serviceName })

  await worker.send(["Ready", serviceName])

  log({ who, id, message: "ready" })

  let cycles = 0
  while (true) {
    const [kind, clientId, ...request] = await worker.receive()

    if (String(kind) !== "Request") {
      log({ who, message: "unknown kind", kind: String(kind) })
      continue
    }

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
    const reply = request
    await worker.send(["Reply", serviceName, clientId, ...reply])
  }
}
