import { style } from "@vanilla-extract/css";
import { pageLayout } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../../styles/themes.css";

export const linkStyle = style({
  overflow: "hidden",
  cursor: "pointer",

  borderRadius: "10px",
  padding: "0.5rem",
  background: "transparent",

  height: "3rem",

  display: "flex",
  gap: "0.5rem",
});

export const text = style({
  zIndex: "1",
  position: "relative",
  paddingRight: "0.5rem",

  whiteSpace: "nowrap",
  fontWeight: "600",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
