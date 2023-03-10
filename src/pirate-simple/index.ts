import * as Zmq from "zeromq"
import { randomPort } from "../utils/node/randomPort"

/**

   We use `Dealer` and `Router` instead of `Request` and `Reply`.

   The client is the same as `pirate-lazy`,
   we can keep this API the same by
   using two routers in the broker.

   The broker is the same as `load-balancing-broker`.

**/

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
  startClient({ serverAddress, timeout, retries })

  startBroker({ frontendAddress, backendAddress })

  const overloadDelay = 2000
  const workDelay = 300

  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
  startWorker({ backendAddress, overloadDelay, workDelay })
}

main()
