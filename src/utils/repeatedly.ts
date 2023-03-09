type Task = (() => Promise<void>) | (() => void)

export async function repeatedly(n: number, task: Task): Promise<void> {
  while (n > 0) {
    await task()
    n--
  }
}
