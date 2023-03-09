import * as Zmq from "zeromq"
import { wait } from "../utils/wait"
import type { Broker } from "./Broker"

type Options = {
  frontendAddress: string
  backendAddress: string
}

export async function startBroker(options: Options) {
  const { frontendAddress, backendAddress } = options

  const who = "broker"

  const broker: Broker = {
    frontend: new Zmq.Router(),
    backend: new Zmq.Router(),
    workerQueue: [],
  }

  await broker.frontend.bind(frontendAddress)
  await broker.backend.bind(backendAddress)

  console.log({ who, message: "started" })

  handleResult(broker)
  handleTask(broker)
}

async function handleResult(state: Broker) {
  for await (const [workerId, kind, ...rest] of state.backend) {
    state.workerQueue.push(String(workerId))

    switch (String(kind)) {
      case "Ready": {
      }

      case "Result": {
        const [clientId, result] = rest
        await state.frontend.send([clientId, result])
      }
    }
  }
}

async function handleTask(state: Broker) {
  while (true) {
    const workerId = state.workerQueue.shift()
    if (workerId === undefined) {
      await wait(10)
      continue
    }

    const [clientId, task] = await state.frontend.receive()
    await state.backend.send([workerId, clientId, task])
  }
}
