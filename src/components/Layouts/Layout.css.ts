import { style } from "@vanilla-extract/css";
import { pageLayout } from "../../styles/utility-styles.css";
import { hsla } from "../../styles/theme.util";
import { theme } from "../../styles/themes.css";

export const appContainer = style({
  /* border: 2px dashed red; */
  position: "relative",

  /* background-color: #222, */

  flex: 1 /* stretches to fill the height */,

  display: "flex",
  flexDirection: "column",

  // @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
  //   flex-direction: column,
  // }
});

export const header = style({
  zIndex: 10,

  position: "sticky",
  top: 0,
});

export const notificationContainer = style({
  zIndex: 2,

  position: "relative",
  top: `${theme.mainNav.maxHeight}px`,
  // top: ${({ theme }) => theme.dimensions.mainNav.maxHeight}px,

  width: "100%",
});

export const pageContainer = style({
  /* border: 2px dashed green; */

  zIndex: 1,
  position: "relative",

  flex: 1 /* stretches to fill the height */,

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});
