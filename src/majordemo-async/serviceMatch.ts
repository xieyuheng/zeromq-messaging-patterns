import type { Service } from "./Service"

export async function serviceMatch(service: Service): Promise<void> {
  // while (broker.requests.length > 0 && broker.workerIds.length > 0) {
  //   const request = broker.requests.shift()!
  //   const workerId = broker.workerIds.shift()!
  //   await broker.backend.send([workerId, ...request])
  // }
}
