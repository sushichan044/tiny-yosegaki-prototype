import type { Metadata } from "next"

import Favicons from "@/components/layouts/meta/Favicons"
// css
import { SITE_NAME } from "@/consts"
import { env } from "@/env.mjs"
import "@/styles/globals.scss"
// import { FONT_VARIABLE_CLASS } from "@/lib/font"
import { theme } from "@/theme"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
// eslint-disable-next-line perfectionist/sort-imports
import "@mantine/core/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  description:
    "X(旧Twitter)アカウントだけで気軽にWeb完結の寄せ書きを作成できます。",
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  robots: {
    follow: false,
    index: false,
  },
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <Favicons />
      </head>
      <body>
        <NextTopLoader color="#37a0d1" height={2} showSpinner={false} />
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
