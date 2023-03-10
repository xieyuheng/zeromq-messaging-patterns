import * as Zmq from "zeromq"
import type { Service } from "./Service"

export type Broker = {
  frontend: Zmq.Router
  backend: Zmq.Router
  services: Map<string, Service>
}

export function createBroker(): Broker {
  return {
    frontend: new Zmq.Router({ sendHighWaterMark: 1 }),
    backend: new Zmq.Router({ sendHighWaterMark: 1 }),
    services: new Map(),
  }
}
