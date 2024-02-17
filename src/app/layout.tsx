import type { Metadata } from "next"

// css
import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { SITE_NAME } from "@/consts"
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
    "X(旧Twitter)アカウントだけで気軽にWebサイト完結の寄せ書きを作成できます。",
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
      </head>
      <body>
        <NextTopLoader color="#37a0d1" showSpinner={false} />
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <Header />
            {children}
            <Footer />
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
