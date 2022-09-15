import {
  Dimension,
  Font,
  Theme,
  Breakpoints,
  Color,
  MainColor,
} from "@emotion/react";

import { colord } from "colord";

/**
 * Creates a spread of colors based on a "main" color
 * @args color is an object with at least a "main" property
 * @returns Returns a Color object
 */
export const createColorSpread = (color: MainColor): Color => {
  const mainColor = colord(color.B00);

  return {
    L30: color.L30 ?? mainColor.lighten(0.3).toHslString(),
    L20: color.L20 ?? mainColor.lighten(0.2).toHslString(),
    L10: color.L10 ?? mainColor.lighten(0.1).toHslString(),
    B00: color.B00,
    D10: color.D10 ?? mainColor.darken(0.1).toHslString(),
    D20: color.D20 ?? mainColor.darken(0.2).toHslString(),
    D30: color.D30 ?? mainColor.darken(0.3).toHslString(),
  };
};

/** @todo implement createTheme */
export const createTheme = (theme: Partial<Theme>) => {
  return theme as Theme;
};
