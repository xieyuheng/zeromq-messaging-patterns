import * as Zmq from "zeromq"
import { log } from "../utils/log"

type Options = {
  serverAddress: string
}

export async function startServer(options: Options) {
  const {serverAddress} = options

  const who = "server"

  const server = new Zmq.Router()

  await server.bind(serverAddress)

  log({ who, message: "started" })
  //
}
