import { Dimension, Font, Breakpoints } from "@emotion/react";

export const DEFAULT_DIMENSIONS: Dimension = {
  unit: 14,
  mainNav: {
    maxWidth: 100,
    maxHeight: 70,
  },
  subNav: {
    maxWidth: 60,
    maxHeight: 60,
  },
};

export const DEFAULT_FONT: Font = {
  size: DEFAULT_DIMENSIONS.unit,
  family: "Sora, sans-serif",
  weight: "400",
};

export const DEFAULT_BREAKPOINTS: Breakpoints = {
  xxs: 320,
  xs: 480,
  s: 768,
  m: 1024,
  l: 1920,
  xl: 2560,
  xxl: 4096,
};
