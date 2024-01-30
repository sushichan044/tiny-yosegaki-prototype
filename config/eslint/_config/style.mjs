import prettierConfig from "eslint-config-prettier"
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural"

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  prettierConfig,
  perfectionistNatural,
  {
    rules: {
      "perfectionist/sort-union-types": [
        "error",
        {
          "nullable-last": true,
          "order": "asc",
          "type": "natural",
        },
      ],
    },
  },
]

export default config
