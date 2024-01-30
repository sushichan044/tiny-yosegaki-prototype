//@ts-check

import { FlatCompat } from "@eslint/eslintrc"

import { __dirname } from "./dir.mjs"

export const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})
