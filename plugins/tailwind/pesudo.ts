import createPlugin from "tailwindcss/plugin"

const pseudoPlugin = createPlugin(({ addVariant }) => {
  addVariant("hocus", ["&:hover", "&:focus"])
  addVariant("not-first", "&:not(:first-child)")
  addVariant("not-last", "&:not(:last-child)")
  addVariant("peer-hocus", [":merge(.peer):hover &", ":merge(.peer):focus &"])
  addVariant("group-hocus", [
    ":merge(.group):hover &",
    ":merge(.group):focus &",
  ])
})

export { pseudoPlugin }
