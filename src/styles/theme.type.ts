export type HSLV = `${number}, ${number}%, ${number}%`; // short for HSL Values
export type HSL = `hsl(${HSLV})`;
export type HSLA = `hsla(${HSLV}, ${number})`;

export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColorSpread = Record<ColorShade, HSLV>;

export type ColorTheme = {
  primary: ColorSpread;
  onPrimary: ColorSpread;

  secondary: ColorSpread;
  onSecondary: ColorSpread;

  surface: ColorSpread;
  onSurface: ColorSpread;

  antiSurface: ColorSpread;
  onAntiSurface: ColorSpread;
};
