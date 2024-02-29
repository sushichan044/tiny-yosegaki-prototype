// eslint-disable-next-line no-restricted-imports
import "./src/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@supabase/ssr",
      "@supabase/storage-js",
      "@supabase/supabase-js",
    ],
  },
}

export default nextConfig
