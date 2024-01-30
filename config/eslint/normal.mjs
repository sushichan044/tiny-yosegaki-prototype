//@ts-check

import js from "@eslint/js"
import gitignore from "eslint-config-flat-gitignore"

import base from "./_config/base.mjs"
import style from "./_config/style.mjs"

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [gitignore(), js.configs.recommended, ...base, ...style]

export default config
