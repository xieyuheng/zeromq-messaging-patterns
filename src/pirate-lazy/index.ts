import * as Zmq from "zeromq"
import { randomPort } from "../utils/node/randomPort"

/**

   We use `Dealer` and `Router` instead of `Request` and `Reply`.

**/

import { startClient } from "./startClient"
import { startServer } from "./startServer"

async function main() {
  Zmq.context.blocky = false

  const serverAddress = `tcp://127.0.0.1:${await randomPort()}`

  const timeout = 1500
  const retries = 3

  startClient({ serverAddress, timeout, retries })

  const overloadDelay = 2500
  const workDelay = 300

  startServer({ serverAddress, overloadDelay, workDelay })
}

main()
