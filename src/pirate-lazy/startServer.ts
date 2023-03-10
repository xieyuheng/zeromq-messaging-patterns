import * as Zmq from "zeromq"
import { log } from "../utils/log"
import { randomNat } from "../utils/randomNat"
import { wait } from "../utils/wait"

type Options = {
  serverAddress: string
}

export async function startServer(options: Options): Promise<void> {
  const { serverAddress } = options
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
        log({ who, message: "simulating a crash" })
        return
      }

      if (randomNat(3) === 0) {
        log({ who, message: "simulating CPU overload" })
        await wait(2000)
      }
    }

    log({ who, message: "normal request" })
    await wait(1000)
    await server.send(request)
  }
}
