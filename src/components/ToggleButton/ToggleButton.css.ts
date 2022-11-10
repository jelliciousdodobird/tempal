import { style } from "@vanilla-extract/css";
import { pageLayout } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const container = style({
  cursor: "pointer",
  backgroundColor: hsla(theme.colors.surface[5]),

  borderRadius: "5rem",

  width: "2.5rem",
  padding: 2,

  display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
});

export const scrubber = style({
  width: "1rem",
  height: "1rem",

  borderRadius: "50%",

  backgroundColor: hsla(theme.colors.primary[5]),
});

export const content = style([pageLayout, {}]);
