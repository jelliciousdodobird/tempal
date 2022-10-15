import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { temTypeColorMap } from "../../data/temtems";
import { flexCenter } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../styles/themes.css";

export const baseElementType = style({
  padding: "3px 6px",
  borderRadius: "5px",

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
  minHeight: "22rem",
  maxHeight: "22rem",

  marginTop: "4rem",

  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  // gap: "1rem",
});

export const cardBackground = style({
  // border: "1px dashed gray",

  zIndex: -1,
  position: "absolute",

  height: "100%",
  width: "100%",

  display: "flex",
  justifyContent: "center",
});

export const backgroundImageContainer = style([
  flexCenter,
  {
    // border: "1px dashed red",
    position: "relative",

    borderRadius: "12px",
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
  right: 0,
  // right: 0,
  // margin: "0 auto", // centers a position: absolute element

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

export const contentContainer = style({
  // border: "1px solid red",

  position: "relative",
  padding: "1.5rem",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const edgeSize = 50;
export const headerContent = style({
  // outline: "1px dashed gold",
  position: "relative",

  // padding: "0 1.5rem",
  // paddingTop: "1.5rem",
  width: "100%",
  height: edgeSize,
  maxHeight: edgeSize,
  minHeight: edgeSize,

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 5,
});

export const cardTitle = style([
  // flexCenter,
  {
    position: "absolute",
    top: "-3.5rem",
    left: "-1rem",

    // width: "100%",
    gap: "0.5rem",

    display: "flex",
  },
]);

export const nameTextStyle = style([
  flexCenter,
  {
    userSelect: "none",
    fontWeight: 700,
    fontSize: "18px",
    whiteSpace: "nowrap",
  },
]);

export const numberTextStyle = style([
  flexCenter,
  {
    userSelect: "none",
    fontFamily: "Fira Code",
    fontWeight: 600,
    fontSize: "18px",
    color: hsla(theme.colors.onSurface[5], 0.4),

    selectors: {
      [`${lightTheme} &`]: {
        // fontWeight: 500,

        color: hsla(theme.colors.onSurface[5], 0.7),
        // color: hsla(theme.colors.surface[5], 0.8),
      },
    },
  },
]);

export const elementRow = style({
  display: "flex",
  gap: 5,
});

export const lumaImgIcon = style({
  ":hover": {
    cursor: "pointer",
    filter: "invert(100%)",
  },
});

export const mainContent = style({
  // border: "1px dashed blue",

  padding: "0.5rem",
  paddingTop: "0.5rem",
  // paddingBottom: "1.5rem",

  borderRadius: 16,

  // backgroundColor: "hsla(0, 0%, 100%, 0.8)",
  // backgroundColor: hsla("0, 0%, 80%"),
  // backgroundColor: hsla(theme.colors.onSurface[0]),
  backgroundColor: "#fff",
  width: "100%",
  flex: 1,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  // flexDirection: "column",
  // justifyContent: "space-evenly",
});

export const tabContent = style({
  padding: "1rem",
  display: "flex",
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

  selectors: {
    [`${lightTheme} &`]: {
      boxShadow: "inset 0px 0px 0px 1px hsl(0, 0%, 0%, 0.15)",
    },
  },
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
    color: hsla("0, 0%, 100%", 0.4),
    fontWeight: 500,

    selectors: {
      [`${lightTheme} &`]: {
        color: hsla("0, 0%, 0%", 0.5),
        fontWeight: 700,
      },
    },
  },
]);

export const statValue = style([
  statFont,
  {
    width: 50,
    paddingRight: 10,
    color: "white",

    display: "flex",
    justifyContent: "flex-end",

    selectors: {
      [`${lightTheme} &`]: {
        color: hsla("0, 0%, 0%", 1),
      },
    },
  },
]);

export const listContainer = style({
  borderBottom: `1px solid ${hsla(theme.colors.surface[0], 0.05)}`,

  padding: "0 0.5rem",
  paddingBottom: "0.5rem",

  display: "flex",
  // justifyContent: "space-between",
  // justifyContent: "",
  gap: "1rem",
});

export const listItem = style([
  flexCenter,
  {
    position: "relative",

    // border: "1px solid red",
    height: 28,
    // padding: "0 6px",
  },
]);

export const baseItemButton = style({
  zIndex: 1,
  position: "relative",

  cursor: "pointer",

  fontSize: 12,
  // textTransform: "uppercase",
  color: hsla(theme.colors.surface[5]),

  backgroundColor: "transparent",

  // padding: "0 3px",
  width: "100%",
  height: "100%",

  transition: "color 200ms linear",
});

export const itemButton = styleVariants({
  default: [
    baseItemButton,
    {
      fontWeight: 600,
      // color: hsla(theme.colors.surface[0], 0.5)
      color: hsla(theme.colors.surface[5], 0.5),
    },
  ],
  selected: [
    baseItemButton,
    { fontWeight: 700, color: hsla(theme.colors.surface[5], 1) },
  ],
});

export const tab = style({
  zIndex: 0,
  position: "absolute",
  bottom: -8,
  isolation: "isolate",
  // bottom: 0,

  // borderRadius: 10,

  height: 3,
  width: "100%",
  // height: "100%",
  // width: "100%",
  backgroundColor: hsla(theme.colors.secondary[8]),
});
