/**

   We use `Dealer` and `Router` instead of `Request` and `Reply`.

**/

import { startBroker } from "./startBroker"
import { startClient } from "./startClient"

async function main() {
  const timeout = 2500
  const retries = 3
  const serverAddress = "tcp://127.0.0.1:3000"

  startClient({ serverAddress, timeout, retries })
  startBroker({ serverAddress })
}

main()
