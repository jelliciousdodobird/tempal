import { style, styleVariants } from "@vanilla-extract/css";
import { read } from "fs";
import { redirect } from "next/dist/server/api-utils";

import { temTypeColorMap } from "../../data/temtems";
import { hsla } from "../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../styles/themes.css";

export const baseElementType = style({
  padding: "3px 6px",
  borderRadius: "3px",

  textTransform: "capitalize",
  fontWeight: 600,
  fontSize: "12px",
});

export const elementTypeLabel = styleVariants(
  temTypeColorMap,
  (elementColor) => [
    baseElementType,
    { color: elementColor.dark, background: elementColor.base },
  ]
);

export const square = style({
  width: 50,
  height: 50,
  padding: "2px 6px",

  fontFamily: "Fira Code",
  fontSize: 12,

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
});

type ColorKey = keyof typeof theme.colors;

const onColorMap: Record<ColorKey, ColorKey> = {
  primary: "onPrimary",
  onPrimary: "onPrimary",

  secondary: "onSecondary",
  onSecondary: "onSecondary",

  surface: "onSurface",
  onSurface: "onSurface",

  antiSurface: "onAntiSurface",
  onAntiSurface: "onAntiSurface",
};

export const coloredSquares = Object.entries(theme.colors).map(
  ([key, colorSpread]) => ({
    key,
    colors: styleVariants(colorSpread, (color, colorShadeKey) => [
      square,
      {
        backgroundColor: hsla(color),
        color: hsla(theme.colors[onColorMap[key as ColorKey]][colorShadeKey]),
      },
    ]),
  })
);

export const colorRow = style({ display: "flex" });

export const colorKey = style({
  width: "8rem",
  fontWeight: 600,
  paddingRight: "1rem",

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});
