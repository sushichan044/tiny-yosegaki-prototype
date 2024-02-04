type NonNegativeInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `${string}.${string}` | `-${string}`
    ? never
    : T

type Enumerate<Max extends number, IncrementalNumbers extends number[] = []> =
  Max extends NonNegativeInteger<Max>
    ? IncrementalNumbers["length"] extends Max
      ? IncrementalNumbers[number]
      : Enumerate<Max, [...IncrementalNumbers, IncrementalNumbers["length"]]>
    : never

type IntRange<Min extends number, Max extends number> =
  Min extends NonNegativeInteger<Min>
    ? Max extends NonNegativeInteger<Max>
      ? Exclude<Enumerate<Max>, Enumerate<Min>> | Max
      : never
    : never

const safeParseInt = (value: string): number | undefined => {
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? undefined : parsed
}

export { safeParseInt }
export type { Enumerate, IntRange, NonNegativeInteger }
