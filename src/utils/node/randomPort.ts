import detect from "detect-port"
import { randomNat } from "../randomNat"

export async function randomPort(): Promise<number> {
  const port = 10000 + randomNat(10000)
  return await detect(port)
}
