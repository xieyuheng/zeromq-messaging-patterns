import type { Broker } from "./Broker"

export async function brokerHandleTask(broker: Broker) {
  for await (const [clientId, payload] of await broker.frontend) {
    broker.tasks.push({ clientId, payload })
  }
}
