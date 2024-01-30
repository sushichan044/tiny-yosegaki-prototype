import createPlugin from "tailwindcss/plugin"

const contentVisibilityPlugin = createPlugin(({ addUtilities }) => {
  addUtilities({
    ".content-visibility-auto": {
      "content-visibility": "auto",
    },
    ".content-visibility-hidden": {
      "content-visibility": "hidden",
    },
    ".content-visibility-visible": {
      "content-visibility": "visible",
    },
  })
})

export { contentVisibilityPlugin }
