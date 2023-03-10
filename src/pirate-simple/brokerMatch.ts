import type { Broker } from "./Broker"

/**

   `brokerMatch` need to be called after every change
   of `broker.tasks` or `broker.workerIds`,
   this is the perfect place to use reactive programming.

**/

export async function brokerMatch(broker: Broker): Promise<void> {
  while (broker.tasks.length > 0 && broker.workerIds.length > 0) {
    const { clientId, payload } = broker.tasks.shift()!
    const workerId = broker.workerIds.shift()!

    await broker.backend.send([workerId, clientId, payload])
  }
}
