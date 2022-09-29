import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";
import {
  createColorSpread as ccs,
  reverseColorSpread as reverse,
  repeatColorSpread as repeat,
} from "./theme.util";
import { ColorTheme } from "./theme.type";

const common = createGlobalTheme(":root", {
  unit: "14px",
  mainNav: {
    maxWidth: "100px",
    maxHeight: "70px",
  },
  subNav: {
    maxWidth: "60px",
    maxHeight: "60px",
  },
  font: {
    size: "14px",
    family: "Sora, sans-serif",
    weight: "400",
  },
  breakpoints: {
    xxs: "320px",
    xs: "480px",
    s: "768px",
    m: "1024px",
    l: "1920px",
    xl: "2560px",
    xxl: "4096px",
  },
});

const darkColors: ColorTheme = {
  primary: ccs("hsl(200, 70%, 60%)"),
  onPrimary: repeat("hsl(0, 0%, 100%)"),

  secondary: ccs("hsl(0, 60%, 50%)"),
  onSecondary: repeat("hsl(0, 0%, 100%)"),

  surface: ccs("hsl(0, 0%, 15%)"),
  onSurface: ccs("hsl(0, 0%, 100%)"),

  antiSurface: ccs("hsl(0, 0%, 85%)"),
  onAntiSurface: ccs("hsl(0, 0%, 0%)"),
};

const lightColors: ColorTheme = {
  primary: ccs("hsl(200, 70%, 60%)"),
  onPrimary: repeat("hsl(0, 0%, 100%)"),

  secondary: ccs("hsl(0, 60%, 50%)"),
  onSecondary: repeat("hsl(0, 0%, 100%)"),

  surface: reverse(ccs("hsl(0, 0%, 100%)")),
  onSurface: reverse(ccs("hs(0, 0%, 15%)")),

  antiSurface: ccs("hsl(0, 0%, 0%)"),
  onAntiSurface: ccs("hsl(0, 0%, 85%)"),
};

// createThemeContract's type checking is not as strict as desired
// so we use our own Theme typing / defining (see above)
// then we use vanilla-extract's createTheme() helper functions to create the css variables:
const colors = createThemeContract<ColorTheme>({ ...darkColors });
export const darkTheme = createTheme(colors, darkColors);
export const lightTheme = createTheme(colors, lightColors);

export const theme = { ...common, colors };
