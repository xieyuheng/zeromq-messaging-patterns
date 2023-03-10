import * as Zmq from "zeromq"

import { startBroker } from "./startBroker"
import { startClient } from "./startClient"
import { startWorker } from "./startWorker"

async function main() {
  Zmq.context.blocky = false

  const timeout = 1500
  const retries = 5

  /**

     If a client is not patient enough,
     it might abandon the service,
     while there are still workers alive.

  **/

  const frontendAddress = "tcp://127.0.0.1:3000"
  const backendAddress = "tcp://127.0.0.1:3001"
  const serverAddress = frontendAddress

  startClient({ serverAddress, timeout, retries })
  startClient({ serverAddress, timeout, retries })
  startClient({ serverAddress, timeout, retries })

  startBroker({ frontendAddress, backendAddress })

  const overloadDelay = 2500
  const workDelay = 300

  startWorker({ serviceName: "Coffee", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Coffee", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
  startWorker({ serviceName: "Tea", backendAddress, overloadDelay, workDelay })
}

main()
