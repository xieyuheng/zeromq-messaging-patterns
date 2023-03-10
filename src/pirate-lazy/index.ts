/**

   We use `Dealer` and `Router` instead of `Request` and `Reply`.

**/

import { startClient } from "./startClient"
import { startServer } from "./startServer"

async function main() {
  const timeout = 2500
  const retries = 3
  const serverAddress = "tcp://127.0.0.1:3000"

 startClient({ serverAddress, timeout, retries })
 startServer({ serverAddress })
}

main()
