import type * as Zmq from "zeromq"

export type Broker = {
  frontend: Zmq.Router
  backend: Zmq.Router
  workerQueue: Array<string>
}
