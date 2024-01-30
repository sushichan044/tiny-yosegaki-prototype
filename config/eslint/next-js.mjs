//@ts-check

import js from "@eslint/js"
import gitignore from "eslint-config-flat-gitignore"

import base from "./_config/base.mjs"
import next from "./_config/next.mjs"
import style from "./_config/style.mjs"
import typescript from "./_config/typescript.mjs"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  gitignore(),
  js.configs.recommended,
  ...base,
  ...style,
  ...typescript,
  ...next,
]

export default config
