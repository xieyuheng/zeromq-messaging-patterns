import { repeatedly } from "../utils/repeatedly"
import { startBroker } from "./startBroker"
import { startWorker } from "./startWorker"

async function main() {
  /**

     The example runs for five seconds and then each worker prints how
     many tasks they handled. If the routing worked, we’d expect a
     fair distribution of work.

  **/

  const workersNumber = 10
  const address = "tcp://127.0.0.1:3000"

  startBroker({ workersNumber, address })
  repeatedly(workersNumber, () => {
    startWorker({ address })
  })
}

main()
