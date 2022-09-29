import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { temTypeColorMap } from "../../data/temtems";
import { flexCenter } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../styles/themes.css";

export const baseElementType = style({
  padding: "3px 6px",
  borderRadius: "3px",

  textTransform: "capitalize",
  fontWeight: 600,
  fontSize: "12px",
});

export const elementTypeLabel = styleVariants(
  temTypeColorMap,
  (elementColor) => [
    baseElementType,
    { color: elementColor.dark, background: elementColor.base },
  ]
);

export const container = style({
  // border: "1px dashed gray",
  position: "relative",

  width: "100%",
  minHeight: "25rem",
  maxHeight: "25rem",

  marginTop: "4rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const cardBackground = style({
  // border: "1px dashed gray",

  zIndex: -1,
  position: "absolute",

  height: "100%",
  width: "100%",
  padding: "3px",

  display: "flex",
  justifyContent: "center",
});

export const backgroundImageContainer = style([
  flexCenter,
  {
    // border: "1px dashed red",
    position: "relative",

    borderRadius: "5px",
    overflow: "hidden",

    background: hsla(theme.colors.surface[6]),

    width: "100%",
    height: "100%",

    selectors: {
      [`${darkTheme} &`]: {
        // boxShadow: "rgba(0, 0, 0, 0.15) 0px 10px 50px",
        // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.20)",
      },
      [`${lightTheme} &`]: {
        // border: `1px solid ${hsla(theme.colors.antiSurface[5], 0.2)}`,
      },
    },
  },
]);

export const backgroundBlur = style({
  userSelect: "none",

  width: "100%",
  height: "100%",

  objectFit: "none",

  filter: "blur(5px) opacity(0.4)",
  transform: "scale(6)",

  selectors: {
    [`${lightTheme} &`]: {
      filter: "blur(5px) opacity(0.5)",
      // border: `1px solid ${hsla(theme.colors.antiSurface[5], 0.2)}`,
    },
  },
});

export const specieImageContainer = style({
  // outline: "1px solid red",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "0 auto", // centers a position: absolute element

  width: 128,
  height: 128,

  display: "flex",
});

export const specieImage = style({
  userSelect: "none",

  width: "100%",
  height: "100%",

  objectFit: "contain",
});

const edgeSize = 60;

export const headerContent = style({
  // outline: "1px dashed gold",
  position: "relative",

  width: "100%",
  height: edgeSize,
  maxHeight: edgeSize,
  minHeight: edgeSize,

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const cardTitle = style([
  flexCenter,
  {
    width: "100%",
    gap: "0.5rem",
  },
]);

export const nameTextStyle = style([
  flexCenter,
  {
    userSelect: "none",
    fontWeight: 700,
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
]);

export const numberTextStyle = style([
  flexCenter,
  {
    userSelect: "none",
    fontFamily: "Fira Code",
    fontWeight: 600,
    fontSize: "14px",
    color: hsla(theme.colors.onSurface[5], 0.4),

    selectors: {
      [`${lightTheme} &`]: {
        color: hsla(theme.colors.onSurface[5], 0.5),
      },
    },
  },
]);

export const lumaImgIcon = style({
  ":hover": {
    cursor: "pointer",
    filter: "invert(100%)",
  },
});

export const mainContent = style({
  //  border: "1px dashed blue",

  padding: "0 2rem",
  width: "100%",
  flex: 1,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

export const shadow = "0px 0px 1px rgba(0, 0, 0, 1)";

export const topLeftTipContainer = style({
  position: "relative",

  width: edgeSize,
  height: edgeSize,

  display: "flex",
});

export const topRightTipContainer = style([
  topLeftTipContainer,
  {
    justifyContent: "flex-end",
  },
]);

export const tipSvg = style({ position: "absolute", width: "100%" });

export const topLeftTipSvg = style([
  tipSvg,
  {
    selectors: {
      [`${lightTheme} &`]: {
        // filter: `drop-shadow(${shadow})`,
      },
    },
  },
]);

export const topRightTipSvg = style([
  tipSvg,
  {
    transform: "rotate(90deg)",

    selectors: {
      [`${lightTheme} &`]: {
        // filter: `drop-shadow(${shadow})`,
      },
    },
  },
]);

globalStyle(`${darkTheme} ${tipSvg} > path`, {
  color: hsla(theme.colors.antiSurface[10], 0.15),
});

globalStyle(`${lightTheme} ${tipSvg} > path`, {
  // color: hsla(theme.colors.antiSurface[10], 0.5),
  color: hsla(theme.colors.surface[5], 0.3),
  // color: hsla(theme.colors.antiSurface[5], 0.2),
});

export const bottomTipContainer = style({
  /* outline: 1px dashed blue; */

  position: "relative",

  width: "100%",
  height: 50,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});

export const row = style({
  width: "100%",
  height: "min-content",

  display: "flex",
  gap: "0.25rem",
});

export const contentRow = styleVariants({
  row: [row, { flexDirection: "row" }],
  column: [row, { flexDirection: "column" }],
});

export const statsContainer = style([
  contentRow.column,
  {
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
  boxShadow: "inset 0px 0px 0px 1px hsl(0, 0%, 100%, 0.1)",
  width: "100%",
});

// width: ${ ({ fillPercentage }) => fillPercentage }%,

export const statLine = style({
  // border: "1px dashed red",
  borderRadius: 12,

  height: 3,
  backgroundColor: "gold",

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
    // color: hsla(theme.colors.antiSurface[7]),
    color: hsla("0, 0%, 100%", 0.4),
    fontWeight: 400,
  },
]);

export const statValue = style([
  statFont,
  {
    width: 50,
    paddingRight: 10,

    display: "flex",
    justifyContent: "flex-end",

    color: "white",
  },
]);
