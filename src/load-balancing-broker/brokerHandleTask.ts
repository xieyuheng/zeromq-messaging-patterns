import { wait } from "../utils/wait"
import type { Broker } from "./Broker"

export async function brokerHandleTask(broker: Broker) {
  while (true) {
    const workerId = broker.workerIds.shift()
    if (workerId === undefined) {
      await wait(10)
      continue
    }

    const [clientId, task] = await broker.frontend.receive()
    await broker.backend.send([workerId, clientId, task])
  }
}
