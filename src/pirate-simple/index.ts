import { startClient } from "./startClient"
import { startServer } from "./startServer"

export async function main() {
  const serverAddress = "tcp://127.0.0.1:3000"

  startServer({ serverAddress })
  startClient({ serverAddress })
}

main()
