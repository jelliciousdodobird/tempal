import { style, styleVariants } from "@vanilla-extract/css";
import { centerer, flexCenter } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { darkTheme, lightTheme, theme } from "../../styles/themes.css";

const subMenuHeight = "3rem";
// export const glowBase = style({
//   width: "100%",
//   height: "100%",
//   borderRadius: "5rem",

//   // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
//   background: hsla(theme.colors.white[0], 0.3),
//   backdropFilter: "blur(5px)",

//   padding: 2,
// });

export const searchContainer = style({
  position: "relative",

  width: "100%",
  // height: "100%",

  // height: "6rem",
  // borderRadius: "5rem",

  // boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 30px 0px",

  background: hsla(theme.colors.white[0]),
  // backdropFilter: "blur(5px)",

  // padding: 6,

  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // gap: 8,

  // color: hsla(theme.colors.black[5]),
});

export const searchContent = style([
  centerer,
  {
    // border: "1px solid gold",
    // padding: 6,

    position: "relative",

    width: "100%",
    height: "100%",

    paddingTop: "1rem",
    paddingBottom: "1rem",

    display: "flex",
    // alignItems: "center",
    flexDirection: "row",

    gap: "1rem",

    color: hsla(theme.colors.black[5]),

    "@media": {
      "(max-width: 650px)": {
        flexDirection: "column",
      },
    },
  },
]);

export const searchBar = style({
  // border: "1px solid red",

  // borderBottom: `2px solid ${hsla(theme.colors.white[3])}`,

  width: "100%",

  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const searchOptions = style({
  // border: "1px solid blue",

  position: "relative",

  width: "min-content",

  display: "flex",
  // justifyContent: "space-between",
  alignItems: "center",

  gap: 8,
  "@media": {
    "(max-width: 650px)": {
      width: "100%",
    },
  },
});

export const searchInput = style({
  // borderBottom: `1px solid ${hsla(theme.colors.white[3])}`,

  // position: "relative",
  // borderRadius: 8,

  // background: hsla(theme.colors.white[0], 1),
  // backdropFilter: "blur(5px)",

  background: "white",

  // padding: "0 16px",

  width: "100%",
  height: "100%",

  fontSize: 14,

  color: hsla(theme.colors.surface[1]),

  selectors: {
    '&[type="search"]::-webkit-search-decoration, &[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-results-button, &[type="search"]::-webkit-search-results-decoration':
      {
        WebkitAppearance: "none",
      },
  },

  ":focus": {
    // borderBottom: `1px solid ${hsla(theme.colors.primary[3])}`,
  },
});

export const selectMenuFont = style({
  fontSize: 12,
  color: hsla(theme.colors.black[5]),
  textTransform: "capitalize",
});

export const selectMenuBox = style({ position: "relative", height: "100%" });

export const selectValueButton = style([
  selectMenuFont,
  {
    userSelect: "none",

    // padding: "0 "
    cursor: "pointer",

    borderRadius: 4,

    height: "100%",
    width: "5rem",
    background: hsla(theme.colors.white[5]),

    fontWeight: 600,
  },
]);

export const dropdownBox = style({
  border: `1px solid ${hsla(theme.colors.white[3])}`,
  overflow: "hidden",
  // position: "absolute",
  // left: 0,

  // height: subMenuHeight,

  userSelect: "none",

  // marginTop: 4,
  borderRadius: 6,
  // padding: "8px 0",
  // width: "100%",

  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",

  background: hsla(theme.colors.white[0]),

  display: "flex",
  // flexDirection: "column",
});

export const selectItem = style([
  selectMenuFont,
  {
    cursor: "pointer",
    padding: "0 10px",
    height: "2rem",

    display: "flex",
    alignItems: "center",

    selectors: {
      '&[data-selected="true"]': {
        // color: "red",
        fontWeight: 600,

        background: hsla(theme.colors.white[3]),
        // color: hsla(theme.colors.positive[4]),
      },
    },

    ":hover": {
      background: hsla(theme.colors.white[5]),
    },
  },
]);

export const sortButton = style([
  flexCenter,
  {
    // outline: `1px solid ${hsla(theme.colors.white[3])}`,

    boxShadow: `0 0 0 1px ${hsla(theme.colors.white[3])}`,

    cursor: "pointer",
    background: "transparent",

    borderRadius: 6,
    height: "2rem",
    padding: "5px 10px",

    // fontSize: 12,

    display: "flex",
    gap: 4,

    ":hover": {
      background: hsla(theme.colors.white[3]),
    },
  },
]);

export const sortingDesc = style({
  whiteSpace: "nowrap",
  fontSize: 12,

  textTransform: "capitalize",
});
