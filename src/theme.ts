import {
  type DefaultMantineColor,
  type MantineColorsTuple,
  createTheme,
} from "@mantine/core"

type Member = "itsuki" | "nakuru" | "nayuta"

const MEMBER_TW_COLORS = {
  itsuki: {
    50: "#fff9e2",
    100: "#fdf0ce",
    200: "#fae0a0",
    300: "#f7cf6d",
    400: "#f4c142",
    500: "#f3b827",
    600: "#f2b316",
    700: "#d79d07",
    800: "#c08b00",
    900: "#a67700",
  },
  nakuru: {
    50: "#e3f9ff",
    100: "#d3eef9",
    200: "#acd9ed",
    300: "#81c3e2",
    400: "#5eb1d8",
    500: "#47a6d3",
    600: "#37a0d1",
    700: "#258cba",
    800: "#147da7",
    900: "#006c95",
  },
  nayuta: {
    50: "#ffeaf5",
    100: "#fbd4e3",
    200: "#f3a8c4",
    300: "#eb79a4",
    400: "#e45088",
    500: "#e03877",
    600: "#e02a6e",
    700: "#c71c5d",
    800: "#b31452",
    900: "#9d0246",
  },
} as const satisfies { [key in Member]: Record<number, string> }

const MEMBER_COLORS = {
  itsuki: [
    "#fff9e2",
    "#fdf0ce",
    "#fae0a0",
    "#f7cf6d",
    "#f4c142",
    "#f3b827",
    "#f2b316",
    "#d79d07",
    "#c08b00",
    "#a67700",
  ],
  nakuru: [
    "#e3f9ff",
    "#d3eef9",
    "#acd9ed",
    "#81c3e2",
    "#5eb1d8",
    "#47a6d3",
    "#37a0d1",
    "#258cba",
    "#147da7",
    "#006c95",
  ],
  nayuta: [
    "#ffeaf5",
    "#fbd4e3",
    "#f3a8c4",
    "#eb79a4",
    "#e45088",
    "#e03877",
    "#e02a6e",
    "#c71c5d",
    "#b31452",
    "#9d0246",
  ],
} as const satisfies { [key in Member]: MantineColorsTuple }

const theme = createTheme({
  colors: MEMBER_COLORS,
})

type ExtendedCustomColors = DefaultMantineColor | keyof typeof MEMBER_TW_COLORS
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}

export { MEMBER_TW_COLORS, theme }
