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
    url = url.endsWith("/") ? url : `${url}/`
  }
  return url
}

type NormalizePathName<Path extends string> = Path extends "/"
  ? "/"
  : Path extends `/${infer Rest}`
    ? Rest extends `${infer Body}/`
      ? `/${Body}`
      : `/${Rest}`
    : Path extends `${infer Body}/`
      ? `/${Body}`
      : `/${Path}`

const normalizePathName = <const Path extends string>(
  target: Path,
): NormalizePathName<Path> => {
  let result: string = target
  if (result === "/") {
    return "/" as NormalizePathName<Path>
  }

  if (!target.startsWith("/")) {
    result = `/${result}`
  }
  if (target.charAt(result.length - 1) === "/") {
    result = result.slice(0, -1)
  }
  return result as NormalizePathName<Path>
}

type RemoveBasePath<Path extends string, Remove extends string> =
  NormalizePathName<Remove> extends "/"
    ? NormalizePathName<Path>
    : NormalizePathName<Path> extends NormalizePathName<Remove>
      ? "/"
      : NormalizePathName<Path> extends `${NormalizePathName<Remove>}/${infer Rest}`
        ? NormalizePathName<Rest>
        : NormalizePathName<Path>

type RemovePathNameOptions<R extends string> = {
  pathNameToRemove: R
}

const removePathName = <const P extends string, const R extends string>(
  target: P,
  options: RemovePathNameOptions<R>,
): RemoveBasePath<P, R> => {
  const { pathNameToRemove } = options
  const normalizedTarget = normalizePathName(target)
  const normalizedPathNameToRemove = normalizePathName(pathNameToRemove)

  if (normalizedPathNameToRemove === "/") {
    return normalizedTarget as RemoveBasePath<P, R>
  }

  const regex = new RegExp(`^${normalizedPathNameToRemove}`)
  if (!regex.test(normalizedTarget)) {
    return normalizedTarget as RemoveBasePath<P, R>
  }
  const result = normalizedTarget.replace(regex, "")
  return result as RemoveBasePath<P, R>
}

export { getSiteUrl, normalizePathName, removePathName }
