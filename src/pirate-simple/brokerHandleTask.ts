import type { Broker } from "./Broker"

export async function brokerHandleTask(broker: Broker) {
  for await (const request of await broker.frontend) {
    broker.requests.push(request)
  }
}
