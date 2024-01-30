type Options =
  | {
      addTrailingSlash?: boolean
    }
  | undefined

// https://supabase.com/docs/guides/auth/concepts/redirect-urls#vercel-preview-urls
const getSiteUrl = ({ addTrailingSlash = false }: Options = {}) => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/"
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  if (addTrailingSlash) {
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  }
  return url
}

export { getSiteUrl }
