import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const borker = new Zmq.Router()

  const who = "broker"

  await broker.bind("tcp://127.0.0.1:3000")

  console.log({ who, message: "started" })
}
