import type { Broker } from "./Broker"
import { createService } from "./Service"
import { serviceReactive } from "./serviceReactive"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest

        const found = broker.services.get(String(serviceName))
        if (found === undefined) {
          const service = serviceReactive(
            broker,
            createService(String(serviceName), {
              requests: [],
              workerIds: [workerId],
            }),
          )

          broker.services.set(String(serviceName), service)
        } else {
          found.workerIds.push(workerId)
        }
      }

      case "Reply": {
        const [serviceName, clientId, ...reply] = rest
        await broker.frontend.send([clientId, "Reply", serviceName, ...reply])

        const found = broker.services.get(String(serviceName))
        if (found === undefined) {
          const service = serviceReactive(
            broker,
            createService(String(serviceName), {
              requests: [],
              workerIds: [workerId],
            }),
          )

          broker.services.set(String(serviceName), service)
        } else {
          found.workerIds.push(workerId)
        }
      }
    }
  }
}
