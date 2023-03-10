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
  const timeout = 2500
  const retries = 3
  const frontendAddress = "tcp://127.0.0.1:3000"
  const backendAddress = "tcp://127.0.0.1:3001"

  startClient({ serverAddress: frontendAddress, timeout, retries })
  startClient({ serverAddress: frontendAddress, timeout, retries })
  startClient({ serverAddress: frontendAddress, timeout, retries })

  startBroker({ frontendAddress, backendAddress })

  startWorker({ backendAddress })
  startWorker({ backendAddress })
}

main()
