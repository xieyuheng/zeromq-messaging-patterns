import * as Zmq from "zeromq"
import { randomPort } from "../utils/node/randomPort"

import { startBroker } from "./startBroker"
import { startClient } from "./startClient"
import { startWorker } from "./startWorker"

async function main() {
  Zmq.context.blocky = false

  const timeout = 1000
  const retries = 8

  /**

     If a client is not patient enough,
     it might abandon the service,
     while there are still workers alive.

  **/

  const frontendAddress = `tcp://127.0.0.1:${await randomPort()}`
  const backendAddress = `tcp://127.0.0.1:${await randomPort()}`
  const serverAddress = frontendAddress

  startClient({ serverAddress, timeout, retries })
  startClient({ serverAddress, timeout, retries })
  startClient({ serverAddress, timeout, retries })

  startBroker({ frontendAddress, backendAddress })

  const overloadDelay = 2000
  const workDelay = 300

  startWorker({
    serviceName: "Water",
    backendAddress,
    overloadDelay,
    workDelay,
  })
  startWorker({
    serviceName: "Coffee",
    backendAddress,
    overloadDelay,
    workDelay,
  })
  startWorker({
    serviceName: "Coffee",
    backendAddress,
    overloadDelay,
    workDelay,
  })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
}

main()
