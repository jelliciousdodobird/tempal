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
    position: "relative",
    // padding: "1rem 0",
    paddingBottom: "1.5rem",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "4rem",
  },
]);

export const listContainer = style({
  scrollMarginTop: "calc(5rem + 4rem + 4rem)",
  // border: "1px dashed red",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gridTemplateRows: "repeat(auto-fit, minmax(30rem, 30rem))",
  gap: "1.5rem",
});

export const header = style({
  position: "relative",
  // isolation: "isolate",

  width: "100%",
  height: "40vh",

  // background: hsla(theme.colors.primary[5]),
});

export const headerBackground = style({
  zIndex: -1,
  position: "absolute",
  top: 0,
  left: 0,

  width: "100%",
  height: "calc(100% + 5rem + 4rem)",

  // background: hsla(theme.colors.primary[5]),
  background: hsla(theme.colors.surface[7]),
});

export const headerContent = style([
  contentCenter,
  {
    fontSize: "5rem",
    fontWeight: "700",
    display: "flex",
    flexDirection: "column",
  },
]);

////////////////////////////////////////////////

export const searchContainer = style({
  // border: `1px solid red`,

  zIndex: 100,
  position: "sticky",
  top: "calc(5rem - 1px)",

  // borderRadius: "5rem",

  marginBottom: "5rem",

  // background: hsla(theme.colors.surface[5]),

  padding: "0.5rem 0",

  width: "100%",
  height: "4rem",
});

export const searchInput = style({
  borderRadius: "5rem",

  background: hsla(theme.colors.onSurface[5], 0.9),
  backdropFilter: "blur(5px)",

  padding: "0 16px",

  width: "100%",
  height: "100%",

  color: hsla(theme.colors.surface[1]),
});

////////////////////////////////////////////////
