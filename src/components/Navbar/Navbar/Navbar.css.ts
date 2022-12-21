import { style } from "@vanilla-extract/css";
import { centerer } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../../styles/themes.css";

export const container = style([
  // pageLayout,
  {
    position: "absolute",

    height: theme.mainNav.maxHeight,

    width: "100%",

    // background: hsla(theme.colors.surface[5], 0.95),
    // backdropFilter: "blur(4px)",
    // borderBottom: `1px solid ${hsla(theme.colors.surface[7])}`,

    // background: "red",

    // display: "flex",
    // justifyContent: "center",

    // transition: "background 250ms linear",

    selectors: {
      [`${darkTheme} &`]: {
        // background: hsla(theme.colors.surface[5], 0.85),
      },
      [`${lightTheme} &`]: {
        // background: hsla(theme.colors.surface[5], 0.9),
      },
    },
  },
]);

// export const bgRed = style({
//   selectors: {
//     [`${darkTheme} &`]: {
//       background: "red",
//     },
//     [`${lightTheme} &`]: {
//       background: hsla(theme.colors.surface[5], 0.9),
//     },
//   },
// });

export const list = style([
  centerer,
  { height: "100%", display: "flex", alignItems: "center", gap: "1rem" },
]);

export const item = style({ color: "white" });

export const stretchedItem = style([
  item,
  {
    flex: 1,
  },
]);
