//@ts-check

import { compat } from "../../libs/eslintCompat.mjs"
import next from "./next.mjs"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [...next, ...compat.extends("plugin:next-on-pages/recommended")]

export default config
