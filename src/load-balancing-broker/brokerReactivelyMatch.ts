import { watch } from "@vue/runtime-core"
import type { Broker } from "./Broker"
import { brokerMatch } from "./brokerMatch"

export function brokerReactivelyMatch(broker: Broker) {
  watch(
    () => broker.workerIds,
    () => {
      brokerMatch(broker)
    }, {
      immediate: true,
      deep: true
    }
  )

  watch(
    () => broker.tasks,
    () => {
      brokerMatch(broker)
    },{
      immediate: true,
      deep: true
    }
  )
}
