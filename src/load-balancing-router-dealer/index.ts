import { repeatedly } from "../utils/repeatedly"
import { startBroker } from "./startBroker"
import { startWorker } from "./startWorker"

async function main() {
  /**

     The example runs for five seconds and then each worker prints how
     many tasks they handled. If the routing worked, we’d expect a
     fair distribution of work.

  **/

  /**

     However, remember the reason for that empty delimiter frame: it’s
     to allow multihop extended requests that terminate in a REP
     socket, which uses that delimiter to split off the reply envelope
     so it can hand the data frames to its application.

     If we never need to pass the message along to a REP socket, we
     can simply drop the empty delimiter frame at both sides, which
     makes things simpler. This is usually the design I use for pure
     DEALER to ROUTER protocols.

  **/

  const workersNumber = 10
  const address = "tcp://127.0.0.1:3000"

  startBroker({ address, workersNumber })
  repeatedly(workersNumber, () => {
    startWorker({ address })
  })
}

main()
