import type { Broker } from "./Broker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    // Whatever message is received from the worker, it is ready again.
    broker.workerIds.push(workerId)

    switch (String(kind)) {
      case "Ready": {
      }

      case "Reply": {
        await broker.frontend.send(rest)
      }
    }
  }
}
