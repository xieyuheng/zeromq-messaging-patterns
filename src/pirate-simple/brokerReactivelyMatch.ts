import { watch } from "@vue/runtime-core"
import type { Broker } from "./Broker"
import { brokerMatch } from "./brokerMatch"

export function brokerReactivelyMatch(broker: Broker) {
  watch(
    () => broker.workerIds.length,
    () => {
      brokerMatch(broker)
    },
  )

  watch(
    () => broker.tasks.length,
    () => {
      brokerMatch(broker)
    },
  )
}
