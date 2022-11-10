import { createVar, globalKeyframes, style } from "@vanilla-extract/css";
import {
  pageLayout,
  placeMid,
  flexCenter,
  glowBorderRadius,
  glowEffect,
} from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

const navHeight = theme.mainNav.maxHeight;
const subHeaderHeight = "4rem";
const extraHeaderSpace = "10rem";
const bannerHeight = "40vh";

export const temsPageBox = style([
  pageLayout,
  {
    position: "relative",
    paddingBottom: "1.5rem",
  },
]);

export const pageContent = style([
  placeMid,
  {
    display: "flex",
    flexDirection: "column",
  },
]);

export const listContainer = style({
  // border: "1px dashed red",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gridTemplateRows: "repeat(auto-fit, minmax(30rem, 30rem))", // future: we'll need this line to virtualize this list
  gap: "2rem",
});

export const header = style({
  // border: "1px dashed red",

  width: "100%",
  minHeight: bannerHeight,
  height: bannerHeight,
  maxHeight: bannerHeight,
});

export const headerBackground = style({
  zIndex: -1,
  position: "absolute",
  top: 0,
  left: 0,

  width: "100%",
  height: `calc(${bannerHeight} + ${subHeaderHeight} + ${extraHeaderSpace})`,

  background: hsla(theme.colors.surface[7]),
});

export const stickyBox = style({
  // border: `1px dashed green`,

  zIndex: 100,
  position: "sticky",
  top: navHeight,

  padding: "0.5rem 0",
  marginBottom: extraHeaderSpace, // we use margin to create space for the headerBackground

  height: subHeaderHeight,
  maxHeight: subHeaderHeight,

  display: "flex",
  gap: "1rem",
});

export const sortButton = style([
  glowEffect,
  flexCenter,
  {
    vars: {
      [glowBorderRadius]: "5rem",
    },

    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
    padding: "0 16px 0 8px",

    minWidth: "min-content",

    // justifyContent: "space-evenly",
    // alignItems: "space-around",

    // gap: 0,

    "@media": {
      [`(max-width: 480px)`]: {
        padding: 0,

        height: "100%",
        aspectRatio: "1 / 1",
      },
    },
  },
]);

export const searchButtonText = style({
  textTransform: "capitalize",
  fontWeight: 400,
  fontSize: 12,

  color: hsla(theme.colors.white[10]),

  "@media": {
    [`(max-width: 480px)`]: {
      position: "absolute",
      opacity: 0,
      pointerEvents: "none",
    },
  },
});

const s = "2rem";

export const iconBox = style([
  flexCenter,
  {
    color: hsla(theme.colors.white[10]),

    width: s,
    height: s,
    minWidth: s,
    minHeight: s,
    maxWidth: s,
    maxHeight: s,

    transform: "scale(0.7)",
  },
]);

export const resultsOverview = style({
  scrollMarginTop: `calc(${navHeight} + ${subHeaderHeight})`,
  width: "100%",
  padding: "2rem 0",
});

export const bolden = style({
  fontFamily: "Fira Code",
  fontWeight: 700,
  color: hsla(theme.colors.positive[5]),
});

export const redBolden = style([
  bolden,
  {
    color: hsla(theme.colors.negative[3]),
  },
]);

export const landingImage = style({
  position: "relative",
  userSelect: "none",

  height: "100%",
  aspectRatio: "1 / 1",
  width: "auto",

  objectFit: "contain",

  alignSelf: "flex-end",
});
