import {
  type DefaultMantineColor,
  type MantineColorsTuple,
  createTheme,
} from "@mantine/core"

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
} as const satisfies Record<string, MantineColorsTuple>

const theme = createTheme({
  colors: MEMBER_COLORS,
})

type ExtendedCustomColors = DefaultMantineColor | keyof typeof MEMBER_COLORS

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}

export { theme }
