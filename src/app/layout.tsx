import type { Metadata } from "next"

import { FONT_VARIABLE_CLASS } from "@/lib/font"
import "@/styles/globals.scss"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"

export const metadata: Metadata = {
  description:
    "La prière 1st Tour 「SPLASH the TONE」 東京振替公演の開催をお祝いする記念寄せ書きWebサイトです！",
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
      <body className={FONT_VARIABLE_CLASS}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
