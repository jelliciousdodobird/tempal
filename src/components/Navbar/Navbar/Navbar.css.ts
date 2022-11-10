import { style } from "@vanilla-extract/css";
import { pageLayout, placeMid } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../../styles/themes.css";

export const container = style([
  pageLayout,
  {
    position: "relative",
    height: theme.mainNav.maxHeight,

    backgroundColor: hsla(theme.colors.surface[5], 0.95),
    backdropFilter: "blur(4px)",
    borderBottom: `1px solid ${hsla(theme.colors.surface[7])}`,

    // display: "flex",
    // justifyContent: "center",

    selectors: {
      [`${darkTheme} &`]: {
        backgroundColor: hsla(theme.colors.surface[5], 0.85),
      },
      [`${lightTheme} &`]: {
        backgroundColor: hsla(theme.colors.surface[5], 0.9),
      },
    },
  },
]);

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
