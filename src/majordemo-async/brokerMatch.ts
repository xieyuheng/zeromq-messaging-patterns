import type { Broker } from "./Broker"

export async function brokerMatch(broker: Broker): Promise<void> {
  // while (broker.requests.length > 0 && broker.workerIds.length > 0) {
  //   const request = broker.requests.shift()!
  //   const workerId = broker.workerIds.shift()!

  //   await broker.backend.send([workerId, ...request])
  // }
}
