export type Service = {
  name: string
  requests: Array<{ clientId: Buffer; request: Array<Buffer> }>
  workerIds: Array<Buffer>
}

export function createService(
  name: string,
  options: {
    requests?: Array<{ clientId: Buffer; request: Array<Buffer> }>
    workerIds?: Array<Buffer>
  },
): Service {
  return {
    name,
    requests: options.requests || [],
    workerIds: options.workerIds || [],
  }
}
