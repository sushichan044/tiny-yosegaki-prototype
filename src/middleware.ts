import { env } from "@/env.mjs"
import { Foras, Memory, deflate, inflate } from "@hazae41/foras"
import { type CookieOptions, createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async get(name: string) {
          await Foras.initBundledOnce()
          const raw = request.cookies.get(name)?.value
          if (!raw) return undefined
          const bytes = new TextEncoder().encode(raw)
          const arr = inflate(new Memory(bytes)).copyAndDispose()
          return new TextDecoder().decode(arr)
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
        async set(name: string, value: string, options: CookieOptions) {
          await Foras.initBundledOnce()
          const bytes = new TextEncoder().encode(value)
          const arr = deflate(new Memory(bytes)).copyAndDispose()
          const compressed = new TextDecoder().decode(arr)
          request.cookies.set({
            name,
            value: compressed,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: compressed,
            ...options,
          })
        },
      },
    },
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
