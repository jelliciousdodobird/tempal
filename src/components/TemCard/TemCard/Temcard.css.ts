import {
  globalKeyframes,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { flexCenter, loadingShimmer } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../../styles/themes.css";
import { temTypes } from "../../../utils/data";

export const baseElementType = style({
  padding: "3px 6px",
  borderRadius: 4,

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
  overflow: "hidden",

  height: "100%",
  width: "100%",

  display: "flex",
  justifyContent: "center",
});

export const backgroundImageContainer = style([
  flexCenter,
  {
    // border: "1px dashed transparent",
    position: "relative",
    overflow: "hidden",

    background: hsla(theme.colors.surface[6]),

    borderRadius: 12,

    width: "100%",
    height: "100%",

    selectors: {
      [`${lightTheme} &`]: {
        background: hsla(theme.colors.onAntiSurface[0]),
      },
    },

    ":hover": {},
  },
]);

// const rotate = "rotate-bg-image";

// globalKeyframes(rotate, {
//   from: {
//     transform: "scale(6) rotate(0deg)",
//   },
//   to: {
//     transform: "scale(6) rotate(360deg)",
//   },
// });

export const backgroundBlur = style({
  userSelect: "none",

  width: "100%",
  height: "100%",

  objectFit: "none",

  filter: "blur(5px) opacity(0.5)",
  transform: "scale(6)",

  transition: "filter 150ms linear",

  // animation: `${rotate} 20s linear infinite normal`,
  // animationPlayState: "paused",
});

globalStyle(`${container}:hover ${backgroundBlur}`, {
  // animationPlayState: "running",
  filter: "blur(5px) opacity(0.6) saturate(225%)",
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

  // this media query is a fix for images that load on iOS with a white border
  "@media": {
    ["not all and (min-resolution:.001dpcm)"]: {
      selectors: {
        [`&[loading="lazy"]`]: {
          clipPath: "inset(0.5px)",
        },
      },
    },
  },
});

export const buttonContainer = style({
  position: "absolute",

  bottom: "-0.5rem",
  right: 0,

  border: `1px solid ${hsla(theme.colors.white[0], 0.1)}`,

  borderRadius: 8,

  padding: "0 3px",
  background: hsla(theme.colors.white[0], 0.1),
  backdropFilter: "blur(5px)",

  display: "flex",
});

export const toggleImgButton = style([
  flexCenter,
  {
    // border: "1px solid blue",

    cursor: "pointer",

    width: "1.5rem",
    height: "1.5rem",

    background: "transparent",
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

export const cardTitle = style({
  position: "absolute",
  top: "-3.5rem",
  left: "-1rem",

  // width: "100%",
  gap: "0.5rem",

  display: "flex",

  ":hover": {
    zIndex: 1000,
  },
});

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

  // borderRadius: 16,
  borderRadius: 8,

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
    borderRadius: 12,
  },
]);
