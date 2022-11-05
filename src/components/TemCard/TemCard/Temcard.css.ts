import { style, styleVariants } from "@vanilla-extract/css";
import { flexCenter, loadingShimmer } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../../styles/themes.css";
import { temTypes } from "../../../utils/data";

export const baseElementType = style({
  padding: "3px 6px",
  borderRadius: "5px",

  textTransform: "capitalize",
  fontWeight: 600,
  fontSize: "12px",
});

export const elementTypeLabel = styleVariants(temTypes, (elementColor) => [
  baseElementType,
  { color: elementColor.colors.dark, background: elementColor.colors.base },
]);

export const container = style({
  // border: "1px dashed gray",

  position: "relative",

  width: "100%",
  minHeight: "26rem",
  maxHeight: "26rem",

  marginTop: "4rem",

  display: "flex",
  flexDirection: "column",
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
      [`${lightTheme} &`]: {
        background: hsla(theme.colors.onAntiSurface[0]),
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
  position: "relative",
  userSelect: "none",

  width: "100%",
  height: "100%",

  objectFit: "contain",
});

export const buttonContainer = style({
  position: "absolute",
  top: 18,
  right: -21,

  // top: 0,
  // right: -21,

  // bottom: 22,
  // right: -32,

  border: `1px solid ${hsla(theme.colors.white[0], 0.1)}`,
  borderRadius: "5rem",

  // padding: "3px 8px",
  padding: "0 5px",
  background: hsla(theme.colors.white[0], 0.1),
  backdropFilter: "blur(5px)",

  display: "flex",
  // gap: 5,
});

export const toggleImgButton = style([
  flexCenter,
  {
    // border: "1px solid blue",

    cursor: "pointer",

    // borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    // width: "1.5rem",
    // height: "1.5rem",

    background: "transparent",
    // background: hsla(theme.colors.white[0]),

    // ":disabled": {
    //   cursor: "wait",
    // },
  },
]);

export const contentContainer = style({
  // border: "1px solid blue",

  position: "relative",
  padding: "1.5rem",
  height: "100%",

  flex: 1,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const edgeSize = 50;
export const headerContent = style({
  // outline: "1px dashed gold",
  position: "relative",

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
    // userSelect: "none",
    fontWeight: 700,
    fontSize: "18px",
    whiteSpace: "nowrap",
  },
]);

export const numberTextStyle = style([
  flexCenter,
  {
    fontFamily: "Fira Code",
    fontWeight: 600,
    fontSize: "18px",
    color: hsla(theme.colors.onSurface[5], 0.4),

    selectors: {
      [`${lightTheme} &`]: {
        color: hsla(theme.colors.onSurface[5], 0.7),
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
  // border: "1px dashed red",

  borderRadius: 16,
  backgroundColor: "hsl(0, 0%, 100%)",
  width: "100%",
  height: "100%",

  flex: 1,

  display: "flex",
  flexDirection: "column",
});

export const tabContent = style({
  // border: "1px dashed blue",

  padding: "1rem",
  height: "100%",

  color: hsla(theme.colors.black[5]),

  display: "flex",
  flexDirection: "column",
});

export const loadingContainer = style([
  flexCenter,
  loadingShimmer,
  {
    // border: "1px solid red",
    position: "absolute",
    borderRadius: 5,
  },
]);
