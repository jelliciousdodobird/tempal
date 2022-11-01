import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { flexCenter } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../../styles/themes.css";
import { temTypes } from "../../../utils/data";

export const statsContainer = style([
  {
    padding: "0 0.5rem",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
]);

export const statLineContainer = style({
  //  border: "1px solid green",
  position: "relative",
  width: "100%",

  display: "flex",
  alignItems: "center",
  gap: 5,
});

export const maxStatLine = style({
  position: "relative",
  // boxShadow: `inset 0px 0px 0px 1px hsl(0, 0%, 100%, 0.1)`,
  boxShadow: `inset 0px 0px 0px 1px ${hsla(theme.colors.white[2])}`,
  width: "100%",
});

export const statLine = style({
  // border: "1px dashed red",
  borderRadius: 12,

  height: 3,
  backgroundColor: hsla(theme.colors.caution[3]),

  fontSize: 10,
  fontWeight: 700,

  display: "flex",
});

export const statFont = style({
  // outline: "1px solid green"

  fontFamily: "Fira Code",
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
});

export const statLabel = style([
  statFont,
  {
    width: 50,
    color: hsla(theme.colors.white[10]),
    fontWeight: 500,
  },
]);

export const statValue = style([
  statFont,
  {
    width: 50,
    paddingRight: 10,
    color: hsla(theme.colors.black[7]),

    display: "flex",
    justifyContent: "flex-end",
  },
]);

export const tvYieldContainer = style({
  padding: "0 1rem",
  width: "100%",

  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
});

export const tvItem = style({
  // border: "1px solid red",

  borderRadius: 8,
  padding: "0 6px",
  background: hsla(theme.colors.white[5]),

  height: "min-content",

  display: "flex",
  flexDirection: "row",

  gap: "0.25rem",
});

export const tvLabel = style([
  flexCenter,
  {
    textTransform: "uppercase",
    // height: "100%",

    fontSize: 12,
    fontWeight: 600,
  },
]);

export const tvValue = style([
  flexCenter,
  {
    background: hsla(theme.colors.white[5]),

    borderRadius: "50%",
    width: 20,
    height: 20,

    fontFamily: "Fira Code",
    fontSize: 12,
    fontWeight: 600,
  },
]);

export const matchupGridWrapper = style({
  // border: "1px dashed green",

  width: "100%",

  display: "flex",
  flexDirection: "column",
});

export const matchupGridContainer = style({
  // outline: "1px solid red",
  position: "relative",

  padding: 8,
  borderRadius: "0 0 12px 12px",

  width: "100%",
  background: hsla(theme.colors.white[2]),

  display: "flex",
  gap: 2,
});

export const matchupGridLabel = style({
  position: "relative",

  borderRadius: "12px 12px 0 0",
  marginBottom: 1,

  minHeight: "2rem",
  maxHeight: "2rem",
  height: "2rem",
  background: hsla(theme.colors.white[3]),

  whiteSpace: "nowrap",
  color: hsla(theme.colors.black[10]),
  fontSize: 12,
  fontWeight: 500,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
