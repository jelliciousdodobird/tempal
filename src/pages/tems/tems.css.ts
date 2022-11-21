import { createVar, globalKeyframes, style } from "@vanilla-extract/css";
import {
  pageLayout,
  placeMid,
  flexCenter,
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

  padding: "1rem 0",

  width: "100%",
  minHeight: bannerHeight,
  height: bannerHeight,
  maxHeight: bannerHeight,

  display: "flex",
  flexDirection: "column",
});

export const headerBackground = style([
  flexCenter,
  {
    overflow: "hidden",

    zIndex: -1,
    position: "absolute",
    // top: 0,
    top: `calc(-1 * ${navHeight})`,
    left: 0,

    width: "100%",
    height: `calc(${navHeight} + ${bannerHeight} + ${subHeaderHeight} + ${extraHeaderSpace})`,

    background: hsla(theme.colors.surface[7]),

    ":after": {
      zIndex: 1000,
      position: "absolute",
      top: 0,
      left: 0,

      content: "",
      width: "100%",
      height: "100%",

      background: `linear-gradient(transparent 50%, ${hsla(
        theme.colors.surface[5]
      )})`,
    },
  },
]);

export const H1 = style({
  fontSize: "5rem",
  fontWeight: 700,
});

export const bannerBgImage = style({
  border: "1px solid red",

  transform: "scale(5000%)",
  filter: "blur(2px)",
});

export const stickyBox = style({
  // border: `1px dashed green`,

  zIndex: 100,
  position: "sticky",
  top: navHeight,

  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",

  padding: "0.5rem 0",
  marginBottom: extraHeaderSpace, // we use margin to create space for the headerBackground

  height: subHeaderHeight,
  maxHeight: subHeaderHeight,

  display: "flex",
  gap: "0.5rem",

  ":before": {
    // border: `1px dashed green`,
    zIndex: -1,

    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    margin: "auto 0",
    background: "rgba(0, 0, 0, 0.3)",

    // transform: "translateY(-1)"

    content: "",
    width: "100%",
    height: "50%",
    // height: 0,

    boxShadow: "rgba(0, 0, 0, 0.6) 0px 0px 30px 0px",
  },
});

export const sortButton = style([
  flexCenter,
  {
    position: "relative",
    borderRadius: 8,
    cursor: "pointer",
    // boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",
    padding: "0 16px 0 8px",

    minWidth: "min-content",
    background: hsla(theme.colors.white[0]),
    color: hsla(theme.colors.black[0]),

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
  color: "inherit",
  textTransform: "capitalize",
  fontWeight: 400,
  fontSize: 14,

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
    color: "inherit",

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

export const sortBox = style({
  // border: "1px solid red",
  color: "black",

  position: "absolute",
  top: "4rem",

  boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",

  padding: "1rem",
  borderRadius: 8,

  width: "100%",
  background: hsla(theme.colors.white[0]),

  display: "flex",
  // flexDirection: "column",
  gap: "3rem",

  // justifyContent: "space-between",

  "@media": {
    ["(max-width: 480px)"]: {
      flexDirection: "column",
      gap: "1rem",
    },
  },
});

export const groupKey = style({
  fontSize: 12,
  fontWeight: 400,

  color: hsla(theme.colors.black[10]),
});

export const groupItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const sortItem = style({
  position: "relative",
  userSelect: "none",
  cursor: "pointer",

  borderRadius: 4,

  textTransform: "capitalize",

  ":hover": {
    background: hsla(theme.colors.white[5]),
  },

  display: "flex",
  alignItems: "center",
});

export const sortItemLabel = style({
  padding: "2px 5px",
  borderRadius: 4,

  flex: 1,

  selectors: {
    "&[data-selected=true]": {
      background: hsla(theme.colors.black[5]),
      color: hsla(theme.colors.white[0]),
    },
  },
});

export const sortIconBox = style([
  flexCenter,
  {
    width: 20,
    height: 20,

    // position: "absolute",
    // right: 0,
    // transform: "translateX(100%)",

    color: hsla(theme.colors.black[0]),
    // color: hsla(theme.colors.white[0]),
  },
]);

export const sortingDesc = style([bolden, { fontFamily: "Sora, san-serif" }]);
