import type { Broker } from "./Broker"

export async function brokerListenFrontend(broker: Broker) {
  for await (const message of broker.frontend) {
    const [clientId, kind, serviceName, ...request] = message
    // [clientId, kind, serviceName, ...request]
    // broker.requests.push()
  }
}
