import { createVar, globalKeyframes, style } from "@vanilla-extract/css";
import {
  contentCenter,
  flexCenter,
  glowAnimation,
  glowBorderRadius,
  glowEffect,
  glowGradient,
  rotateGlowGradient,
} from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

const navHeight = theme.mainNav.maxHeight;
const subHeaderHeight = "4rem";
const extraHeaderSpace = "10rem";

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
    // gap: "1rem",
  },
]);

export const listContainer = style({
  // border: "1px dashed red",
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gridTemplateRows: "repeat(auto-fit, minmax(30rem, 30rem))", // future: we'll need this line to virtualize this list
  gap: "1.5rem",
});

export const header = style({
  // border: "1px dashed red",
  position: "relative",
  width: "100%",
  height: "40vh",
});

export const headerBackground = style({
  zIndex: -1,
  position: "absolute",
  top: 0,
  left: 0,

  width: "100%",
  height: `calc(100% + ${subHeaderHeight} + ${extraHeaderSpace})`,

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

export const subHeader = style([
  {
    // border: `1px dashed green`,

    zIndex: 100,
    position: "sticky",
    top: navHeight,

    padding: "0.5rem 0",
    marginBottom: extraHeaderSpace,

    height: subHeaderHeight,
    maxHeight: subHeaderHeight,
  },
]);

export const subHeaderContent = style([
  contentCenter,
  {
    height: "100%",

    display: "flex",
    gap: "1rem",
  },
]);

export const sortButton = style([
  glowEffect,
  flexCenter,
  {
    vars: {
      [glowBorderRadius]: "5rem",
    },

    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
    padding: "0 16px",
    gap: 5,
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
