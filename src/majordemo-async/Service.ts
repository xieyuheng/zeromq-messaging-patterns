export type Service = {
  name: string
  requests: Array<Array<Buffer>>
  workerIds: Array<Buffer>
}
