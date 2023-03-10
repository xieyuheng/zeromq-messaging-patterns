export type Service = {
  name: string
  requests: Array<{ clientId: Buffer; request: Array<Buffer> }>
  workerIds: Array<Buffer>
}

export function createService(name: string): Service {
  return {
    name,
    requests: [],
    workerIds: [],
  }
}
