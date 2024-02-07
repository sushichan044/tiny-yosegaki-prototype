import type { Metadata } from "next"

// import { FONT_VARIABLE_CLASS } from "@/lib/font"
import { theme } from "@/theme"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import NextTopLoader from "nextjs-toploader"
// css
// eslint-disable-next-line perfectionist/sort-imports
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "@/styles/globals.scss"

export const metadata: Metadata = {
  description:
    "La prière 1st Tour 「SPLASH the TONE」 東京振替公演の開催をお祝いする記念寄せ書きWebサイトです！",
  robots: {
    follow: false,
    index: false,
  },
  title: "La prière 1st Tour記念寄せ書きWebサイト",
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
      </head>
      <body>
        <NextTopLoader color="#47a6d3" showSpinner={false} />
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
