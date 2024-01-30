//@ts-check

// eslint-disable-next-line no-restricted-imports
import { nextOnPages } from "./config/eslint/index.mjs"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [...nextOnPages]

export default config
