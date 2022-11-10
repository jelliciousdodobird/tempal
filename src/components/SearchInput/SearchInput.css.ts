import { style, styleVariants } from "@vanilla-extract/css";
import {
  glowAnimation,
  glowBorderRadius,
  glowEffect,
  glowGradient,
  rotateGlowGradient,
} from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../styles/themes.css";

export const glowBase = style([
  glowEffect,
  {
    vars: {
      [glowBorderRadius]: "5rem",
      [glowAnimation]: `${rotateGlowGradient} 10000ms linear infinite normal`,
      [glowGradient]: `conic-gradient(
        ${hsla(theme.colors.negative[5])},
        ${hsla(theme.colors.caution[5])}, 
        ${hsla(theme.colors.positive[5])}, 
        transparent 25% 90%, 
        ${hsla(theme.colors.negative[5])} 
      )`,
    },
    width: "100%",
    height: "100%",
    borderRadius: "5rem",

    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
    background: hsla(theme.colors.white[0], 0.3),
    backdropFilter: "blur(5px)",

    padding: 2,
  },
]);

export const searchContainer = styleVariants({
  normal: [glowBase, {}],
  focused: [
    glowBase,
    {
      vars: {
        [glowAnimation]: `${rotateGlowGradient} 10000ms linear infinite normal`,
        [glowGradient]: `repeating-conic-gradient(
          ${hsla(theme.colors.positive[5], 1)} 0%,
          ${hsla(theme.colors.positive[10], 1)} 15%
        )`,
      },
    },
  ],
});

export const searchInput = style({
  position: "relative",
  borderRadius: "5rem",

  background: hsla(theme.colors.white[0], 1),
  backdropFilter: "blur(5px)",

  padding: "0 16px",

  width: "100%",
  height: "100%",

  fontSize: 14,

  color: hsla(theme.colors.surface[1]),

  // transform: ""
});
