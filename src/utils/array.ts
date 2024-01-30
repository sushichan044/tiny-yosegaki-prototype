import type { Enumerate } from "@/utils/number"

/**
 * Checks if a value belongs to an array of allowed values.
 * @param value The value to check.
 * @param allowedValues The array of allowed values.
 * @returns True if the value belongs to the array of allowed values, false otherwise.
 */
function belongsToArray<const TValue>(
  value: unknown,
  allowedValues: ReadonlyArray<TValue>,
): value is TValue {
  return (allowedValues as ReadonlyArray<unknown>).includes(value)
}

/**
 * Returns an array of numbers representing a sequence from 0 to the specified length.
 * @param length The length of the sequence.
 * @returns An array of numbers representing the sequence.
 */
function getNumSequence(length: number): number[] {
  return [...Array(length).keys()]
}

/**
 * Represents a valid index for an array. do not use this type to variable length arrays.
 * @template Arr - The array type.
 * @example ValidIndex<["a", "b", "c"]> // 0 | 1 | 2
 * @example ValidIndex<["a", "b", "c", ...string[]]> // never
 */
type ValidIndex<Arr extends readonly unknown[]> = Enumerate<Arr["length"]>

/**
 * Checks if a given value is a valid index for the provided array.
 * @param array - The array to check.
 * @param value - The value to check if it is a valid index.
 * @returns A boolean indicating whether the value is a valid index.
 */
function isValidIndex<Arr extends readonly unknown[]>(
  array: Arr,
  value: number,
): value is ValidIndex<Arr> {
  return getNumSequence(array.length).includes(value)
}

export { belongsToArray, getNumSequence, isValidIndex }
export type { ValidIndex }
