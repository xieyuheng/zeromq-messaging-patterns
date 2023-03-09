import type { Broker } from "./Broker"

export async function brokerHandleResult(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    broker.workerIds.push(String(workerId))

    switch (String(kind)) {
      case "Ready": {
      }

      case "Result": {
        const [clientId, result] = rest
        await broker.frontend.send([clientId, result])
      }
    }
  }
}
