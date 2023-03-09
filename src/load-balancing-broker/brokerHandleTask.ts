import type { Broker } from "./Broker"
import { brokerMatch } from "./brokerMatch"

export async function brokerHandleTask(broker: Broker) {
  for await (const [clientId, payload] of await broker.frontend) {
    broker.tasks.push({ clientId, payload })

    
  }
}
