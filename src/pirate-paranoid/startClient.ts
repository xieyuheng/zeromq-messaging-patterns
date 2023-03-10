import * as Zmq from "zeromq"
import { log } from "../utils/log"

type Options = {
  serverAddress: string
}

export async function startClient(options: Options) {
  const { serverAddress } = options

  const who = "client"

  const client = new Zmq.Dealer()

  client.connect(serverAddress)

  log({ who, message: "started" })
  //
}
