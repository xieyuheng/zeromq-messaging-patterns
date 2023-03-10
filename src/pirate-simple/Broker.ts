import * as Zmq from "zeromq"

/**

   `Broker` uses two router -- `majordemo` only uses one.

   Using one router, we can add `kind` to messages,
   to distinguish client message from worker message.

   While using two routers, we can already
   distinguish message by the different routers.

   The interface of client and worker becomes more simple,
   since we do not need to format `kind` in the message.

**/

export type Broker = {
  frontend: Zmq.Router
  backend: Zmq.Router
  workerIds: Array<Buffer>
  requests: Array<Array<Buffer>>
}

// frontend.receive: [clientId, ...request]
// frontend.send: [clientId, ...result]

// backend.send: [workerId, ...request]
// backend.receive:
//  | [workerId, "Ready"]
//  | [workerId, "Result", clientId, ...result]

export function createBroker(): Broker {
  return {
    frontend: new Zmq.Router(),
    backend: new Zmq.Router(),
    workerIds: [],
    requests: [],
  }
}
