export type Service = {
  name: string
  requests: Array<{ clientId: Buffer; request: Array<Buffer> }>
  workerIds: Array<Buffer>
}
