import { sleep } from "@/utils/sleep"

describe("sleep", () => {
  it("should resolve after the specified time", async () => {
    const startTime = Date.now()
    const delay = 1000 // milliseconds

    await sleep(delay)

    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    expect(elapsedTime).toBeGreaterThanOrEqual(delay)
  })
})
