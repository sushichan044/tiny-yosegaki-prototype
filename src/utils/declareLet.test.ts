import { declareLet } from "@/utils/declareLet"

describe("declareLet", () => {
  it("should return the value of the function", () => {
    expect(
      declareLet(() => {
        return 1
      }),
    ).toBe(1)
    expect(
      declareLet(() => {
        return "hello"
      }),
    ).toBe("hello")
    expect(
      declareLet(() => {
        return { age: 30, name: "John" }
      }),
    ).toEqual({ age: 30, name: "John" })
  })

  const declareLetWithConditional = (flag: boolean | undefined) => {
    return declareLet(() => {
      let a: number | string = 0
      if (flag === undefined) return a
      if (flag) {
        a = "hello"
      } else {
        a = 1
      }
      return a
    })
  }

  it("can use conditional pattern", () => {
    expect(declareLetWithConditional(undefined)).toBe(0)
    expect(declareLetWithConditional(true)).toBe("hello")
    expect(declareLetWithConditional(false)).toBe(1)
  })
})
