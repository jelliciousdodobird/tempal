import { style, styleVariants } from "@vanilla-extract/css";
import {
  flexCenter,
  glowAnimation,
  glowBorderRadius,
  glowEffect,
  glowGradient,
  rotateGlowGradient,
} from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../styles/themes.css";

// export const glowBase = style({
//   width: "100%",
//   height: "100%",
//   borderRadius: "5rem",

//   // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
//   background: hsla(theme.colors.white[0], 0.3),
//   backdropFilter: "blur(5px)",

//   padding: 2,
// });

export const searchContainer = style({
  position: "relative",

  width: "100%",
  height: "100%",
  // borderRadius: "5rem",

  // boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",

  background: hsla(theme.colors.white[0], 1),
  backdropFilter: "blur(5px)",

  // padding: "0 16px",
  padding: 6,
  borderRadius: 8,

  display: "flex",
  gap: 8,
});

export const searchInput = style({
  // position: "relative",
  // borderRadius: 8,

  // background: hsla(theme.colors.white[0], 1),
  // backdropFilter: "blur(5px)",

  background: "transparent",

  // padding: "0 16px",

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

export const selectMenuFont = style({
  fontSize: 12,
  color: hsla(theme.colors.black[5]),
  textTransform: "capitalize",
});

export const selectMenuBox = style({ position: "relative" });

export const selectValueButton = style([
  selectMenuFont,
  {
    // padding: "0 "
    cursor: "pointer",

    borderRadius: 4,

    height: "100%",
    width: "5rem",
    background: hsla(theme.colors.white[5]),

    fontWeight: 600,
  },
]);

export const dropdownBox = style({
  overflow: "hidden",
  position: "absolute",
  left: 0,

  marginTop: 4,
  borderRadius: 4,
  // padding: "8px 0",
  width: "100%",

  boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",

  background: hsla(theme.colors.white[3]),

  display: "flex",
  flexDirection: "column",
});

export const selectItem = style([
  selectMenuFont,
  {
    cursor: "pointer",

    padding: 8,

    height: "2rem",

    selectors: {
      '&[data-selected="true"]': {
        // color: "red",
        fontWeight: 600,
      },
    },

    display: "flex",
    alignItems: "center",

    ":hover": {
      background: hsla(theme.colors.white[7]),
    },
  },
]);
