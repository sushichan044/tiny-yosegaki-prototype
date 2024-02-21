//@ts-check

// eslint-disable-next-line no-restricted-imports
import { nextOnPages } from "./config/eslint/index.mjs"

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigArray} */
const config = [
  {
    ignores: ["config/**", "**/*.config.{js,cjs,mjs}"],
  },
  ...nextOnPages,
]

export default config
