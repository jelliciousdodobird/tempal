import { colord } from "colord";
import { clamp } from "../utils/utils";
import { ColorSpread, HSLV, ColorShade } from "./theme.type";

export const getBaseColorSpread = (): ColorSpread => ({
  0: "0, 0%, 0%",
  1: "0, 0%, 0%",
  2: "0, 0%, 0%",
  3: "0, 0%, 0%",
  4: "0, 0%, 0%",
  5: "0, 0%, 0%",
  6: "0, 0%, 0%",
  7: "0, 0%, 0%",
  8: "0, 0%, 0%",
  9: "0, 0%, 0%",
  10: "0, 0%, 0%",
});

export const clampPercentage = (num: number) => clamp(num, 0, 100);

export const createColorSpread = (midColor: string, d = 3): ColorSpread => {
  const base = getBaseColorSpread();
  const { h, s, l } = colord(midColor).toHsl();
  const midIndex = 5;

  const generateHSLValuesString = (i: number): HSLV =>
    `${h}, ${s}%, ${clampPercentage(l + d * (i - midIndex))}%`;

  Object.values(base).forEach(
    (_, shadeIndex) =>
      (base[shadeIndex as ColorShade] = generateHSLValuesString(shadeIndex))
  );

  return base;
};

export const reverseColorSpread = (colorSpread: ColorSpread) => {
  const base = getBaseColorSpread();

  const reversed = Object.values(colorSpread).reverse();
  Object.values(base).forEach(
    (_, shadeIndex) => (base[shadeIndex as ColorShade] = reversed[shadeIndex])
  );

  return base;
};

export const repeatColorSpread = (color: string): ColorSpread => {
  const base = getBaseColorSpread();
  const { h, s, l } = colord(color).toHsl();
  const hslString: HSLV = `${h}, ${s}%, ${l}%`;

  Object.values(base).forEach(
    (_, shadeIndex) => (base[shadeIndex as ColorShade] = hslString)
  );

  return base;
};

export const changeColorOpacity = (color: string, alpha: number) => {
  const { h, s, l } = colord(color).toHsl();
  return `hsl(${h}, ${s}%, ${l}%, ${clamp(0, alpha, 1)})`;
};

export const hsla = (cssVariableOfHSLValues: string, alpha = 1) =>
  `hsla(${cssVariableOfHSLValues}, ${alpha})`;
