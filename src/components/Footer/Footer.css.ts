import { style } from "@vanilla-extract/css";
import { contentCenter } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const container = style({
  height: "5rem",
  backgroundColor: hsla(theme.colors.surface[5]),
  borderTop: `1px solid ${hsla(theme.colors.surface[7])}`,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const content = style([contentCenter, {}]);

export const list = style({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
});

export const item = style({});
