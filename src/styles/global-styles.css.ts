import { globalStyle } from "@vanilla-extract/css";
import { hsla } from "./theme.util";
import { theme } from "./themes.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  border: 0,
  outline: 0,

  fontFamily: theme.font.family,
  fontSize: theme.font.size,
  fontWeight: theme.font.weight,
  color: "inherit",
  // color: hsla(theme.colors.antiSurface[10]),

  WebkitTapHighlightColor: "transparent",
});

globalStyle("*::selection", {
  background: hsla(theme.colors.antiSurface[5]),
  color: hsla(theme.colors.surface[5]),
});

globalStyle("html", {
  // border: "2px dashed red",

  color: hsla(theme.colors.antiSurface[10]),

  backgroundColor: hsla(theme.colors.surface[5]),

  overflow: "hidden",
  scrollBehavior: "smooth",
  overscrollBehaviorX: "contain",

  minHeight: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
});

globalStyle("body", {
  // border: "2px dashed blue",
  scrollBehavior: "smooth",

  overflowX: "hidden",
  overflowY: "auto",
  overscrollBehaviorX: "contain",

  flex: 1,
  display: "flex",
  flexDirection: "column",
});

globalStyle("#__next", {
  // border: "2px dashed yellowgreen",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

globalStyle("a, a:link, a:visited, a:hover, a:active", {
  textDecoration: "none",
});

globalStyle("ul, ol", {
  listStyleType: "none",
});

globalStyle("button", {
  border: 0,
});

globalStyle("button:active, button:focus", {
  outline: 0,
});

globalStyle("input", { border: 0, outline: 0 });

globalStyle("img", { display: "block" });
