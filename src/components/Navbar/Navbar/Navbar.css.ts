import { style } from "@vanilla-extract/css";
import { pageLayout, placeMid } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../../styles/themes.css";

export const container = style([
  pageLayout,
  {
    position: "relative",
    height: theme.mainNav.maxHeight,

    background: hsla(theme.colors.surface[5], 0.95),
    backdropFilter: "blur(4px)",
    borderBottom: `1px solid ${hsla(theme.colors.surface[7])}`,

    // display: "flex",
    // justifyContent: "center",

    transition: "background 250ms linear",

    selectors: {
      [`${darkTheme} &`]: {
        background: hsla(theme.colors.surface[5], 0.85),
        // background: "transparent",
        // backdropFilter: "blur(0px)",
        // borderBottom: "none",
      },
      [`${lightTheme} &`]: {
        background: hsla(theme.colors.surface[5], 0.9),
      },
    },
  },
]);

export const bgRed = style({
  selectors: {
    [`${darkTheme} &`]: {
      background: "red",
    },
    [`${lightTheme} &`]: {
      background: hsla(theme.colors.surface[5], 0.9),
    },
  },
});

export const list = style([
  placeMid,
  { display: "flex", alignItems: "center", gap: "1rem" },
]);

export const item = style({ color: "white" });

export const stretchedItem = style([
  item,
  {
    flex: 1,
  },
]);
