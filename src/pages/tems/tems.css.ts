import { style } from "@vanilla-extract/css";
import { contentCenter } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const idPageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
});

export const row = style({
  display: "flex",
  gap: "1px",
});

export const listPageContainer = style([
  contentCenter,
  {
    padding: "1rem 0",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },
]);

export const list = style({
  // border: "1px dashed red",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
});

export const header = style({
  fontSize: "5rem",
  fontWeight: "700",
  width: "100%",
});
