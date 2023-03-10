import type { Broker } from "./Broker"
import { brokerPrepareWorker } from "./brokerPrepareWorker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest
        brokerPrepareWorker(broker, String(serviceName), workerId)
      }

      case "Reply": {
        const [serviceName, clientId, ...reply] = rest
        brokerPrepareWorker(broker, String(serviceName), workerId)
        await broker.frontend.send([clientId, "Reply", serviceName, ...reply])
      }
    }
  }
}
