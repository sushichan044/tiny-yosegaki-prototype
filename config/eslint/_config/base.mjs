//@ts-check

import globals from "globals"

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    languageOptions: {
      globals: {
        ...globals.es2015, // es6: this automatically sets ecmaVersion: 2015
        ...globals.node,
      },
    },
    rules: {
      "no-extra-semi": "off",
      "require-await": "off",
    },
  },
  {
    ignores: ["**/config/**", "**/scripts/**", "**/test/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./", "../", "~/"],
        },
      ],
    },
  },
]

export default config
