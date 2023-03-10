import type { Broker } from "./Broker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest
        const found = broker.services.get(String(serviceName))
        if (found) {
          found.workerIds.push(workerId)
        } else {
          broker.services.set(String(serviceName), {
            name: String(serviceName),
            requests: [],
            workerIds: [workerId],
          })
        }
      }

      case "Reply": {
        const [clientId, ...reply] = rest
        // await broker.frontend.send(rest)
      }
    }
  }
}
