/**

   We use `Dealer` and `Router` instead of `Request` and `Reply`.

**/

import { startClient } from "./startClient"
import { startServer } from "./startServer"

async function main() {
  const timeout = 2500
  const retries = 3
  const serverAddress = "tcp://localhost:5555"

  startClient({ serverAddress, timeout, retries })
  startServer({ serverAddress })
}

main()
