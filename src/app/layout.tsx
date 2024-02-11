import type { Metadata } from "next"

// css
import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import "@/styles/globals.scss"
// import { FONT_VARIABLE_CLASS } from "@/lib/font"
import { theme } from "@/theme"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
// eslint-disable-next-line perfectionist/sort-imports
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import NextTopLoader from "nextjs-toploader"

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
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
