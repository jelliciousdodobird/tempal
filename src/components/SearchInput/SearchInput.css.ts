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

export const glowBase = style({
  width: "100%",
  height: "100%",
  borderRadius: "5rem",

  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
  background: hsla(theme.colors.white[0], 0.3),
  backdropFilter: "blur(5px)",

  padding: 2,
});

export const searchContainer = style({
  width: "100%",
  height: "100%",
  borderRadius: "5rem",

  boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",
});

export const searchInput = style({
  position: "relative",
  borderRadius: 8,

  background: hsla(theme.colors.white[0], 1),
  backdropFilter: "blur(5px)",

  padding: "0 16px",

  width: "100%",
  height: "100%",

  fontSize: 14,

  color: hsla(theme.colors.surface[1]),

  selectors: {
    '&[type="search"]::-webkit-search-decoration, &[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-results-button, &[type="search"]::-webkit-search-results-decoration':
      {
        WebkitAppearance: "none",
      },
  },
});
