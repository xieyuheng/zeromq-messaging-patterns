import type { Broker } from "./Broker"

export async function brokerListenFrontend(broker: Broker) {
  for await (const message of broker.frontend) {
    const [clientId, kind, serviceName, ...request] = message
    switch (String(kind)) {
      case "Request": {
        const found = broker.services.get(String(serviceName))
        if (found === undefined) {
          broker.services.set(String(serviceName), {
            name: String(serviceName),
            requests: [request],
            workerIds: [],
          })
        } else {
          found.requests.push(request)
        }
      }
    }
  }
}
