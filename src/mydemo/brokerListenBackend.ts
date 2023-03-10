import type { Broker } from "./Broker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest
        const found = broker.services.get(String(serviceName))
        if (found === undefined) {
          broker.services.set(String(serviceName), {
            name: String(serviceName),
            requests: [],
            workerIds: [workerId],
          })
        } else {
          found.workerIds.push(workerId)
        }
      }

      case "Reply": {
        const [clientId, ...reply] = rest
        // const serviceName = ?
        // await broker.frontend.send([clientId, "Reply", serviceName, ...reply])
      }
    }
  }
}
