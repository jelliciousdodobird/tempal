import { style } from "@vanilla-extract/css";
import { pageLayout } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const fullContainer = style({
  zIndex: 100,
  position: "absolute",
  width: "100%",
  height: "100%",
  minWidth: "100%",
  minHeight: "100%",
});

export const background = style({
  zIndex: -1,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(2px)",
  backgroundColor: "rgba(0, 0, 0, 0.85)",
});
