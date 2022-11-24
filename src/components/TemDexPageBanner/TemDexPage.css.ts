import { style } from "@vanilla-extract/css";
import { pageLayout, placeMid } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const container = style([
  {
    position: "relative",
    width: "100%",
    height: "100%",

    background: hsla(theme.colors.surface[7]),
  },
]);

export const buttonStyle = style({
  ":hover": {
    background: "black",
  },
});
