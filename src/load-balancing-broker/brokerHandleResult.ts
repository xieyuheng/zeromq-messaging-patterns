import type { Broker } from "./Broker"
import { brokerMatch } from "./brokerMatch"

export async function brokerHandleResult(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
      }

      case "Result": {
        const [clientId, result] = rest
        await broker.frontend.send([clientId, result])
      }
    }

    // This worker is ready again.

    broker.workerIds.push(workerId)
    brokerMatch(broker)
  }
}
