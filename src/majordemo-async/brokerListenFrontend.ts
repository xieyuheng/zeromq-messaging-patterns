import type { Broker } from "./Broker"

export async function brokerListenFrontend(broker: Broker) {
  for await (const request of await broker.frontend) {
    broker.requests.push(request)
  }
}
