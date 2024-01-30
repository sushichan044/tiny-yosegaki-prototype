import type { Enumerate, IntRange, NonNegativeInteger } from "@/utils/number"

describe("NonNegativeInteger", () => {
  it("should return never if the number is negative or float", () => {
    expectTypeOf<NonNegativeInteger<-1>>().toEqualTypeOf<never>()
    expectTypeOf<NonNegativeInteger<0.5>>().toEqualTypeOf<never>()
  })

  it("should return the number if it is a non negative integer", () => {
    expectTypeOf<NonNegativeInteger<0>>().toEqualTypeOf<0>()
    expectTypeOf<NonNegativeInteger<1>>().toEqualTypeOf<1>()
    expectTypeOf<NonNegativeInteger<2>>().toEqualTypeOf<2>()
  })
})

describe("Enumerate", () => {
  it("should return a union of numbers start from 0 with the specified length", () => {
    expectTypeOf<Enumerate<0>>().toEqualTypeOf<never>
    expectTypeOf<Enumerate<1>>().toEqualTypeOf<0>
    expectTypeOf<Enumerate<2>>().toEqualTypeOf<0 | 1>
    expectTypeOf<Enumerate<3>>().toEqualTypeOf<0 | 1 | 2>
  })

  it("should return never if the length is negative or float", () => {
    expectTypeOf<Enumerate<-1>>().toEqualTypeOf<never>
    expectTypeOf<Enumerate<0.5>>().toEqualTypeOf<never>
  })
})

describe("IntRange", () => {
  it("should return a union of numbers from min to max", () => {
    expectTypeOf<IntRange<0, 0>>().toEqualTypeOf<0>()
    expectTypeOf<IntRange<0, 1>>().toEqualTypeOf<0 | 1>()
    expectTypeOf<IntRange<0, 2>>().toEqualTypeOf<0 | 1 | 2>()
    expectTypeOf<IntRange<1, 1>>().toEqualTypeOf<1>()
    expectTypeOf<IntRange<1, 2>>().toEqualTypeOf<1 | 2>()
  })

  it("should return max value if the min is greater than max", () => {
    expectTypeOf<IntRange<1, 0>>().toEqualTypeOf<0>()
    expectTypeOf<IntRange<2, 1>>().toEqualTypeOf<1>()
    expectTypeOf<IntRange<3, 2>>().toEqualTypeOf<2>()
  })

  it("should return never if the min is negative or float", () => {
    expectTypeOf<IntRange<-1, 0>>().toEqualTypeOf<never>()
    expectTypeOf<IntRange<0.5, 1>>().toEqualTypeOf<never>()
  })

  it("should return never if the max is negative or float", () => {
    expectTypeOf<IntRange<0, -1>>().toEqualTypeOf<never>()
    expectTypeOf<IntRange<1, 0.5>>().toEqualTypeOf<never>()
  })
})
