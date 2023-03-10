import * as Zmq from "zeromq"

async function run() {
  const client = new Zmq.Request()

  client.connect("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  await client.send(["4"])

  {
    const [n, reply] = await client.receive()
    console.log(String(n), String(reply))
  }

  await client.send(["5"])

  {
    const [n, reply] = await client.receive()
    console.log(String(n), String(reply))
  }
}

run()
