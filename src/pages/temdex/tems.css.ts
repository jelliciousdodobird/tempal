import {
  createVar,
  globalKeyframes,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import {
  pageLayout,
  placeMid,
  flexCenter,
  flowGradient,
  centerer,
  gradient,
} from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";
import { elementTypeLabel } from "../../components/TemCard/TemCard/Temcard.css";
import { TemType } from "../../utils/types";
import { temTypes } from "../../utils/data";

const navHeight = theme.mainNav.maxHeight;
const subHeaderHeight = "4rem";
const extraHeaderSpace = "2rem";
const bannerHeight = "40vh";

export const temsPageBox = style([
  // pageLayout,
  {
    // isolation: "isolate",

    position: "relative",
    paddingBottom: "1.5rem",
  },
]);

export const pageContent = style([
  // placeMid,
  centerer,
  {
    // border: "1px dashed blue",
    isolation: "isolate",

    display: "flex",
    flexDirection: "column",
  },
]);

export const headerSection = style([
  // pageContent,
  {
    position: "relative",

    // background: hsla(theme.colors.surface[7]),

    background: `
      linear-gradient(
      170deg, 
      ${hsla(theme.colors.surface[8])} 25%,
      ${hsla(theme.colors.surface[5])} 70%)
      `,
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

export const header = style([
  centerer,
  {
    // border: "1px dashed red",

    // pointerEvents: "none",
    // userSelect: "none",
    // padding: "1rem 0",

    paddingTop: "5rem",
    paddingBottom: "3rem",

    // height: "calc(80vh - 8rem)",

    width: "100%",
    // minHeight: bannerHeight,
    // height: bannerHeight,
    // maxHeight: bannerHeight,

    display: "flex",
    // flexDirection: "column",
    gap: "2rem",

    "@media": {
      [`(max-width: 650px)`]: {
        flexDirection: "column",
      },
    },
  },
]);

export const headerContent = style({
  // border: "1px solid blue",

  // isolation: "isolate",

  width: "100%",
  height: "100%",

  position: "relative",

  display: "flex",
  flexDirection: "column",

  gap: "2rem",
  // justifyContent: "space-around",
});

export const headerBackground = style([
  flexCenter,
  {
    // border: "1px solid red",
    zIndex: -1,
    position: "absolute",
    left: 0,
    top: `calc(-1 * ${navHeight})`,

    overflow: "hidden",

    width: "100%",
    height: "100%",
    // height: `calc(${navHeight} + ${bannerHeight} + ${subHeaderHeight} + ${extraHeaderSpace})`,
    // height: `calc(${navHeight} + 100% + ${subHeaderHeight} + ${extraHeaderSpace})`,

    // background: hsla(theme.colors.surface[7]),

    // ":after": {
    //   zIndex: 1000,
    //   position: "absolute",
    //   top: 0,
    //   left: 0,

    //   content: "",
    //   width: "100%",
    //   height: "100%",

    //   background: `linear-gradient(transparent 50%, ${hsla(
    //     theme.colors.surface[5]
    //   )})`,
    // },
  },
]);

export const H1 = style([
  flowGradient,
  {
    vars: {
      [gradient]: `linear-gradient(
        to right,
        ${temTypes["water"].colors.base},
        ${temTypes["wind"].colors.base},
        ${temTypes["electric"].colors.base},
        ${temTypes["fire"].colors.base}
      )`,
    },

    fontSize: "5rem",
    fontWeight: 800,
    textTransform: "uppercase",
  },
]);

export const tip = style({
  borderRadius: 4,

  fontSize: 12,
  fontWeight: 600,

  padding: "2px 6px",
  marginRight: 4,

  background: hsla(theme.colors.antiSurface[5]),

  color: hsla(theme.colors.surface[5]),
});

export const sortButtonBox = style({
  cursor: "pointer",
  border: `1px solid ${hsla(theme.colors.surface[8])}`,
  borderRadius: 4,

  padding: "4px 8px",

  background: "transparent",
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
  // top: navHeight,
  top: 0,

  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",

  // padding: "0.5rem 0",
  marginBottom: extraHeaderSpace, // we use margin to create space for the headerBackground

  // height: subHeaderHeight,
  // maxHeight: subHeaderHeight,

  display: "flex",
  gap: "0.5rem",

  boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 20px 0px",

  // ":before": {
  //   // border: `1px dashed green`,
  //   zIndex: -1,

  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   margin: "auto 0",
  //   background: "rgba(0, 0, 0, 0.3)",

  //   // transform: "translateY(-1)"

  //   content: "",
  //   width: "100%",
  //   height: "50%",
  //   // height: 0,

  //   boxShadow: "rgba(0, 0, 0, 0.6) 0px 0px 30px 0px",
  // },
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
  zIndex: 99,
  position: "relative",

  scrollMarginTop: `calc(${navHeight} + ${subHeaderHeight})`,
  width: "100%",
  padding: "2rem 0",

  display: "flex",
  justifyContent: "space-between",
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
  border: "1px solid red",

  zIndex: -1,
  position: "absolute",
  top: 0,
  right: 0,

  userSelect: "none",

  marginRight: "5rem",

  maxHeight: "100%",
  // aspectRatio: "1 / 1",
  width: "auto",

  objectFit: "contain",
  // alignSelf: "flex-end",
});

export const sortBox = style({
  // border: "1px solid red",
  color: "black",

  position: "absolute",
  top: "4rem",
  right: 0,

  boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",

  padding: "1rem",
  borderRadius: 8,

  // width: "100%",
  background: hsla(theme.colors.white[0]),

  display: "flex",
  // flexDirection: "column",
  gap: "3rem",

  // justifyContent: "space-between",

  "@media": {
    ["(max-width: 650px)"]: {
      // left: 0,
      width: "100%",
      // flexDirection: "column",

      gap: 0,

      justifyContent: "space-between",

      // gap: "1rem",
    },
  },
});

export const groupKey = style({
  fontSize: 12,
  fontWeight: 500,

  whiteSpace: "nowrap",

  // color: hsla(theme.colors.antiSurface[0]),
  color: "hsla(0,0%,0%, 0.5)",
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

  // ":hover": {
  //   background: hsla(theme.colors.white[5]),
  // },

  display: "flex",
  alignItems: "center",
});

export const sortItemLabel = style({
  fontSize: 12,
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

globalStyle(`${sortItem}:hover > ${sortItemLabel}`, {
  background: hsla(theme.colors.white[5]),
  color: hsla(theme.colors.black[5]),
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

    ":hover": {
      color: hsla(theme.colors.primary[5]),
    },
  },
]);

export const sortingDesc = style([
  bolden,
  { fontFamily: "Sora, san-serif", textTransform: "capitalize" },
]);

export const subTitle = style({
  maxWidth: "25rem",
  fontSize: 20,
  fontWeight: 700,
});

export const tipBox = style([
  subTitle,
  {
    fontSize: 14,
    fontWeight: 500,
    color: hsla(theme.colors.white[10]),
  },
]);

export const queriesContainer = style({
  // border: `1px solid ${hsla(theme.colors.surface[10])}`,

  borderRadius: 10,
  width: "100%",
  height: "100%",

  // padding: "3rem",

  // flexGrow: 1,

  // background: hsla(theme.colors.surface[5]),

  marginTop: "auto",
  marginBottom: "auto",

  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const queryHeader = style({
  marginBottom: "0.5rem",

  fontSize: 24,
  fontWeight: 700,
  textTransform: "uppercase",

  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const tipsButtonBase = style({
  cursor: "pointer",

  borderRadius: 6,
  padding: "8px 12px",
  width: "min-content",

  // marginLeft: "1rem",

  background: "transparent",
  backgroundSize: "200%",

  whiteSpace: "nowrap",
  color: "hsla(0,0%,0%, 0.8)",
  fontWeight: 500,
  fontSize: 12,

  // transition: "margin-left 0.2s",
});

export const tipsButton = styleVariants({
  blue: [
    tipsButtonBase,
    {
      color: temTypes["water"].colors.dark,
      background: temTypes["water"].colors.base,
      // clipPath: `polygon(1% 28%, 0 0, 32% 6%, 85% 0%, 97% 4%, 100% 19%, 98% 58%, 100% 93%, 74% 100%, 54% 96%, 8% 100%, 0 92%)`,
    },
  ],
  red: [
    tipsButtonBase,
    {
      color: temTypes["fire"].colors.dark,
      background: temTypes["fire"].colors.base,
      // clipPath: `polygon(7% 0, 93% 0, 100% 6%, 97% 94%, 25% 100%, 4% 91%, 0 11%)`,
    },
  ],
  green: [
    tipsButtonBase,
    {
      color: temTypes["wind"].colors.dark,
      background: temTypes["wind"].colors.base,
      // clipPath: `polygon(45% 0, 64% 8%, 100% 0, 99% 100%, 76% 94%, 15% 94%, 0 100%, 0 46%, 2% 10%)`,
    },
  ],
  yellow: [
    tipsButtonBase,
    {
      color: temTypes["electric"].colors.dark,
      background: temTypes["electric"].colors.base,
      // clipPath: `polygon(45% 7%, 98% 3%, 100% 45%, 97% 100%, 69% 91%, 19% 94%, 0 100%, 2% 49%, 5% 4%)`,
    },
  ],
  purple: [
    tipsButtonBase,
    {
      color: temTypes["mental"].colors.dark,
      background: temTypes["mental"].colors.base,
      // clipPath: `polygon(75% 13%, 93% 5%, 98% 38%, 100% 100%, 65% 95%, 0 91%, 2% 12%, 8% 0, 53% 0)`,
    },
  ],
});

export const sortedByLabel = style({
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",

  position: "absolute",
  top: "-90%",
  left: -10,
});
