import { reactive } from "@vue/runtime-core"
import type { Broker } from "./Broker"
import { brokerReactivelyMatch } from "./brokerReactivelyMatch"

export function brokerReactive(broker: Broker): Broker {
  broker = reactive(broker) as Broker

  brokerReactivelyMatch(broker)

  return broker
}
