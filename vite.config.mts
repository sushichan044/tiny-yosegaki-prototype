import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    globals: true,
    // typecheck: {
    //   checker: "tsc",
    //   enabled: true,
    //   include: [
    //     "**/*.{test,spec}.?(c|m)[jt]s?(x)",
    //     "**/*.{test,spec}-d.?(c|m)[jt]s?(x)",
    //   ],
    // },
  },
})
