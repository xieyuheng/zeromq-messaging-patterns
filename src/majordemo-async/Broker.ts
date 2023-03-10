import * as Zmq from "zeromq"

export type Broker = {
  frontend: Zmq.Router
  backend: Zmq.Router
  services: Map<string, Service>
}

export type Service = {
  name: string
  requests: Array<Array<Buffer>>
  workerIds: Array<Buffer>
}

export function createBroker(): Broker {
  return {
    frontend: new Zmq.Router({ sendHighWaterMark: 1 }),
    backend: new Zmq.Router({ sendHighWaterMark: 1 }),
    services: new Map(),
  }
}
