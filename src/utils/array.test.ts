import type { ValidIndex } from "@/utils/array"

import { belongsToArray, getNumSequence, isValidIndex } from "@/utils/array"

describe("belongsToArray", () => {
  it("should return true if value belongs to the allowed values array", () => {
    const allowedValues = [1, 2, 3]
    expect(belongsToArray(2, allowedValues)).toBe(true)
  })

  it("should return false if value does not belong to the allowed values array", () => {
    const allowedValues = ["a", "b", "c"]
    expect(belongsToArray("d", allowedValues)).toBe(false)
  })
})

describe("getNumSequence", () => {
  it("should return an array of numbers with the specified length", () => {
    const length = 5
    const result = getNumSequence(length)
    expect(result).toHaveLength(length)
    expect(result).toEqual([0, 1, 2, 3, 4])
  })

  it("should return an empty array if the length is 0", () => {
    const length = 0
    const result = getNumSequence(length)
    expect(result).toHaveLength(length)
    expect(result).toEqual([])
  })
})

describe("ValidIndex", () => {
  it("should return a union of numbers from 0 to the length of the array", () => {
    expectTypeOf<ValidIndex<["a"]>>().toEqualTypeOf<0>()
    expectTypeOf<ValidIndex<[1, 2, 3]>>().toEqualTypeOf<0 | 1 | 2>()
    // @ts-expect-error 4 is not a valid index
    expectTypeOf<ValidIndex<[1, 2, 3]>>().toEqualTypeOf<4>()
    // @ts-expect-error negative indexes are not supported
    expectTypeOf<ValidIndex<[1, 2, 3]>>().toEqualTypeOf<-1>()
  })

  it("should contain all available indexes", () => {
    // @ts-expect-error 0 is not all union of indexes
    expectTypeOf<ValidIndex<[1, 2, 3]>>().toEqualTypeOf<0>()
  })

  it("should return never if the array is empty or too long", () => {
    expectTypeOf<ValidIndex<[]>>().toEqualTypeOf<never>()
    expectTypeOf<ValidIndex<[1, 2, 3, ...number[]]>>().toEqualTypeOf<never>()
  })
})

describe("isValidIndex", () => {
  it("should return true if the value is a valid index in the array", () => {
    const array = [1, 2, 3, 4, 5]
    const value = 2
    expect(isValidIndex(array, value)).toBe(true)
  })

  it("should return false if the value is not a valid index in the array", () => {
    const array = [1, 2, 3, 4, 5]
    const value = 5
    expect(isValidIndex(array, value)).toBe(false)
  })
})
