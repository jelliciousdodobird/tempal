import {
  Dimension,
  Font,
  Theme,
  Breakpoints,
  Color,
  MainColor,
  ColorSpread,
} from "@emotion/react";

import { colord } from "colord";
import { clamp } from "../../utils/utils";

// /**
//  * Creates a spread of colors based on a "main" color
//  * @args color is an object with at least a "main" property
//  * @returns Returns a Color object
//  */
// export const createColorSpread = (color: MainColor): Color => {
//   const mainColor = colord(color.B00);

//   return {
//     L30: color.L30 ?? mainColor.lighten(0.3).toHslString(),
//     L20: color.L20 ?? mainColor.lighten(0.2).toHslString(),
//     L10: color.L10 ?? mainColor.lighten(0.1).toHslString(),
//     B00: color.B00,
//     D10: color.D10 ?? mainColor.darken(0.1).toHslString(),
//     D20: color.D20 ?? mainColor.darken(0.2).toHslString(),
//     D30: color.D30 ?? mainColor.darken(0.3).toHslString(),
//   };
// };

export const createColorSpread = (color: string, d = 3) => {
  const { h, s, l, a } = colord(color).toHsl();

  const start = Math.max(0, l - d * 5);

  const left = [...Array(5).keys()]
    .map((i) => `hsl(${h}, ${s}%, ${l - d * (i + 1)}%, ${a})`)
    .reverse();

  const right = [...Array(5).keys()].map(
    (i) => `hsl(${h}, ${s}%, ${l + d * (i + 1)}%, ${a})`
  );

  const colorSpread = [
    ...left,
    `hsl(${h}, ${s}%, ${l}%, ${a})`,
    ...right,
  ] as ColorSpread;

  // const colorSpread = [...Array(11).keys()].map(
  //   (i) => `hsl(${h}, ${s}%, ${start + d * i}%, ${a})`
  // ) as ColorSpread;

  return colorSpread;
};

export const reverseColorSpread = (colorSpread: ColorSpread) => {
  return [...colorSpread].reverse() as ColorSpread;
};

export const repeatColorSpread = (color: string) => {
  return [...Array(11).keys()].map((i) => color) as ColorSpread;
};

export const changeColorOpacity = (color: string, alpha: number) => {
  const { h, s, l, a } = colord(color).toHsl();

  return `hsl(${h}, ${s}%, ${l}%, ${clamp(0, alpha, 1)})`;
};

/** @todo implement createTheme */
export const createTheme = (theme: Partial<Theme>) => {
  return theme as Theme;
};
