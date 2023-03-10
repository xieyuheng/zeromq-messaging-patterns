import type { Broker } from "./Broker"
import { createService } from "./Service"
import { serviceReactive } from "./serviceReactive"

export async function brokerListenFrontend(broker: Broker) {
  for await (const message of broker.frontend) {
    const [clientId, kind, serviceName, ...request] = message
    switch (String(kind)) {
      case "Request": {
        const found = broker.services.get(String(serviceName))
        if (found === undefined) {
          const service = serviceReactive(
            broker,
            createService(String(serviceName), {
              requests: [{ clientId, request }],
            }),
          )

          broker.services.set(String(serviceName), service)
        } else {
          found.requests.push({ clientId, request })
        }
      }
    }
  }
}
