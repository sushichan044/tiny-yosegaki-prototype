import { compat } from "../../libs/eslintCompat.mjs"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/jsx-boolean-value": "warn",
      "react/jsx-curly-brace-presence": "error",
    },
  },
]

export default config
