import { removePathName } from "@/utils/url"

describe("removePathName", () => {
  it("should remove the specified path name from the target URL", () => {
    const target = "/users/sushi/code/yellbox"
    const result = removePathName(target, {
      pathNameToRemove: "/users",
    })
    expect(result).toBe("/sushi/code/yellbox")
  })

  it("should return target if the path name to remove is not found in the target URL", () => {
    const target = "/users/sushi/code/yellbox"
    const result = removePathName(target, {
      pathNameToRemove: "/projects",
    })
    expect(result).toBe("/users/sushi/code/yellbox")
  })

  it("should handle case-sensitive path names", () => {
    const target = "/Users/sushi/code/yellbox"
    const result = removePathName(target, { pathNameToRemove: "/users" })
    expect(result).toBe("/Users/sushi/code/yellbox")
  })

  it("should handle trailing slashes in the target URL", () => {
    const target = "/users/sushi/code/yellbox/"
    const result = removePathName(target, { pathNameToRemove: "/users" })
    expect(result).toBe("/sushi/code/yellbox")
  })

  it("should remove trailing slashes", () => {
    const target = "/users/sushi/code/yellbox/"
    const result = removePathName(target, { pathNameToRemove: "/users/" })
    expect(result).toBe("/sushi/code/yellbox")
  })

  it("should handle empty path names", () => {
    const target = "/users/sushi/code/yellbox"
    const result = removePathName(target, { pathNameToRemove: "" })
    expect(result).toBe("/users/sushi/code/yellbox")
  })
})
