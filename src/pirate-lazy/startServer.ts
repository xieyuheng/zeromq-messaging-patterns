import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomNat } from "../utils/randomNat"
import { wait } from "../utils/wait"

type Options = {
  serverAddress: string
  overloadDelay: number
  workDelay: number
}

export async function startServer(options: Options): Promise<void> {
  const { serverAddress, overloadDelay, workDelay } = options
  const who = "server"

  const server = new Zmq.Router()

  await server.bind(serverAddress)

  log({ who, message: "started" })

  let cycles = 0
  while (true) {
    const request = await server.receive()
    cycles++

    //  Simulate various problems, after a few cycles
    if (cycles > 3) {
      if (randomNat(10) === 0) {
        log({ who, kind: "Error", message: "simulating a crash" })
        return
      }

      if (randomNat(3) === 0) {
        log({ who, kind: "Warning", message: "simulating CPU overload" })
        await wait(overloadDelay)
      }
    }

    log({ who, message: "working" })
    //  Pretend to work
    await wait(workDelay)
    await server.send(request)
  }
}
