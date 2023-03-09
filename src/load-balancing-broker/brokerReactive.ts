import type { Broker } from "./Broker"
import { brokerReactivelyMatch } from "./brokerReactivelyMatch"

export function brokerReactive(broker: Broker) {
  brokerReactivelyMatch(broker)
}
