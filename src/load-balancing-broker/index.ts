import { startBroker } from "./startBroker"
import { startClient } from "./startClient"
import { startWorker } from "./startWorker"

async function main() {
  const frontendAddress = "tcp://127.0.0.1:3000"
  const backendAddress = "tcp://127.0.0.1:3001"

  startBroker({ frontendAddress, backendAddress })

  startClient({ frontendAddress })
  startClient({ frontendAddress })
  startClient({ frontendAddress })

  startWorker({ backendAddress })
  startWorker({ backendAddress })
}

main()
