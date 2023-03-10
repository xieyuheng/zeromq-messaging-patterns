import { log } from "../utils/log"
import { createBroker } from "./Broker"
import { brokerListenBackend } from "./brokerListenBackend"
import { brokerListenFrontend } from "./brokerListenFrontend"
import { brokerReactive } from "./brokerReactive"

type Options = {
  frontendAddress: string
  backendAddress: string
}

export async function startBroker(options: Options) {
  const { frontendAddress, backendAddress } = options

  const who = "broker"

  const broker = brokerReactive(createBroker())

  await broker.frontend.bind(frontendAddress)
  await broker.backend.bind(backendAddress)

  log({ who, message: "started" })

  brokerListenBackend(broker)
  brokerListenFrontend(broker)
}
