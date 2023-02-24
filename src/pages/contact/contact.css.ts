import {
  createVar,
  globalKeyframes,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { centerer } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const container = style([
  centerer,
  { paddingTop: "6rem", display: "flex", flexDirection: "column", gap: "3rem" },
]);

export const header = style({
  fontSize: "3rem",
  fontWeight: 700,
});

export const contacts = style({
  display: "flex",
  // flexDirection: "column",
  flexWrap: "wrap",
  gap: "3rem",
});

export const contactBox = style({
  position: "relative",
  // borderRadius: 12,

  // width: "100%",
  minWidth: "25rem",
  // border: `1px solid ${hsla(theme.colors.surface[10])}`,
  // padding: "3rem",

  // borderLeft: `1px solid ${hsla(theme.colors.surface[10])}`,

  borderLeft: `6px solid ${hsla(theme.colors.surface[10])}`,

  // boxShadow: `0 0 5px 2px rgb(0,0,0, 0.1)`,

  paddingLeft: "1rem",
  paddingTop: 8,
  paddingBottom: 8,

  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  // ":after": {
  //   position: "absolute",
  //   content: "",
  //   left: "-0.25rem",

  //   height: "100%",

  //   borderLeft: `2px solid ${hsla(theme.colors.positive[10])}`,
  // },
});

export const detail = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const name = style({ fontSize: "2rem", fontWeight: 600 });
export const email = style({ fontFamily: "Fira Code", fontWeight: 500 });
export const discord = style([email, {}]);
