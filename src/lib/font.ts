import { Noto_Sans_JP } from "next/font/google"
import localFont from "next/font/local"

//https://chocolat5.com/ja/tips/nextjs-13-next-font
// variableに指定したCSS変数を_app.tsxのclassNameに指定して
// globals.cssでそのCSS変数を指定するとnext/fontが適用される
// ---------------------------------------------------
// globals.cssでsans-serifを指定しているので、adjustFontFallbackをfalseにする
// https://nextjs.org/docs/api-reference/next/font#adjustfontfallback
const LINE_SEED_JP = localFont({
  src: [
    {
      path: "../assets/LINESeedJP_OTF_Th.woff2",
      style: "normal",
      weight: "100",
    },
    {
      path: "../assets/LINESeedJP_OTF_Rg.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../assets/LINESeedJP_OTF_Bd.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/LINESeedJP_OTF_Eb.woff2",
      style: "normal",
      weight: "800",
    },
  ],
  variable: "--font-line-seed-jp",
})

const NOTO_SANS_JP = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "500", "700"],
})

const fonts = [NOTO_SANS_JP]
const FONT_VARIABLE_CLASS = fonts.map((font) => font.variable).join(" ")

export { FONT_VARIABLE_CLASS, LINE_SEED_JP, NOTO_SANS_JP }
