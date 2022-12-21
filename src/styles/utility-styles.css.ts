import { createVar, globalKeyframes, style } from "@vanilla-extract/css";
import { hsla } from "./theme.util";
import { theme } from "./themes.css";

export const oldcontentCenter = style({
  width: "clamp(300px, calc(50% + 100px), 1024px)",
  margin: "0 auto",

  "@media": {
    [`(max-width: 480px)`]: {
      width: "calc(100% - 2rem)",
    },
  },
});

export const centerer = style({
  maxWidth: "70rem",

  paddingLeft: "1rem",
  paddingRight: "1rem",

  marginLeft: "auto",
  marginRight: "auto",
});

// ----------------------------------------------------------------------
// PURE ULITITY CLASSES:
// - extract common css attribute and values here
// ----------------------------------------------------------------------
export const flexCenter = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const inheritFont = style({
  fontWeight: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontStyle: "inherit",
  color: "inherit",
});

export const bold = style([inheritFont, { fontWeight: 700 }]);
export const italic = style([inheritFont, { fontStyle: "italic" }]);
// ----------------------------------------------------------------------
// LAYOUT CLASSES:
// - use these on each page to align content with the navbar / footer.
// - it is not applied higher up the dom to allow more flexibility with each page.
// ----------------------------------------------------------------------
const threshold = 480;
const scrollbar = 20;
const min = threshold - scrollbar;

export const pageLayout = style({
  display: "grid",

  gridTemplateColumns: `minmax(0, 1fr) minmax(${min}px, 3fr) minmax(0, 1fr)`,
  gridTemplateRows: "none",
  gridTemplateAreas: `"left mid right"`,

  "@media": {
    [`(max-width: ${threshold}px)`]: {
      padding: "0 1rem",
      gridTemplateColumns: "minmax(0, 1fr)",
      gridTemplateRows: "auto auto auto",
      gridTemplateAreas: `"left"
                          "mid"
                          "right"`,
    },
  },
});

export const placeLeft = style({
  gridArea: "left",
});

export const placeMid = style({
  gridArea: "mid",
});

export const placeRight = style({
  gridArea: "right",
});

// ----------------------------------------------------------------------
// ANIMATIONS:
// - use these on each page to align content with the navbar / footer.
// - it is not applied higher up the dom to allow more flexibility with each page.
// ----------------------------------------------------------------------
const shimmer = "shimmer";

globalKeyframes(shimmer, {
  from: {
    backgroundPosition: "0%",
  },
  to: {
    backgroundPosition: "100%",
  },
});

export const loadingShimmer = style({
  width: "100%",
  height: "100%",

  backgroundSize: "400%",
  backgroundPosition: "50%",
  backgroundImage: `linear-gradient(-60deg, 
      rgba(0  ,   0,   0, 0  ) 45%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(0  , 0  ,   0, 0  ) 55%
    )`,

  animation: `${shimmer} 500ms infinite alternate-reverse`,
});
// ----------------------------------------------------------------------
export const animatedGradient = "animatedGradient";

globalKeyframes(animatedGradient, {
  from: {
    backgroundPosition: "0%",
  },
  to: {
    backgroundPosition: "100%",
  },
});

export const gradient = createVar();

export const flowGradient = style({
  vars: {
    [gradient]: `linear-gradient(
      to right,
      #19b28e,
      #fee257,
      #ff3939,
      #217aff
    )`,
  },

  backgroundImage: gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",

  backgroundSize: "300%",
  backgroundPosition: "-100%",

  animation: `${animatedGradient} 5s infinite alternate-reverse`,
});

// ----------------------------------------------------------------------
export const rotateGlowGradient = "rotate-gradient";
globalKeyframes(rotateGlowGradient, {
  from: {
    transform: "translate(-50%, -50%) rotate(0deg)",
  },
  to: {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
});

export const glowBorderColor = createVar();
export const glowBorderWidth = createVar();
export const glowBorderRadius = createVar();
export const glowBackground = createVar();
export const glowGradient = createVar();
export const glowAnimation = createVar();

export const glowEffect = style({
  vars: {
    [glowBackground]: hsla(theme.colors.white[0]),
    [glowBorderColor]: hsla(theme.colors.white[0], 0.3),
    [glowBorderWidth]: "2px",
    [glowBorderRadius]: "3px",
    [glowAnimation]: `${rotateGlowGradient} 2000ms linear infinite normal`,
    [glowGradient]: `conic-gradient(
      ${hsla(theme.colors.negative[5])},
      ${hsla(theme.colors.caution[5])}, 
      ${hsla(theme.colors.positive[5])}, 
      transparent 50% 90%, 
      ${hsla(theme.colors.negative[5])} 
    )`,
  },

  overflow: "hidden",
  isolation: "isolate", // allows us to use negative zIndex without the child disappearing behind the parent
  position: "relative",

  borderRadius: glowBorderRadius,
  background: glowBorderColor,
  backdropFilter: "blur(5px)",
  color: "black",

  ":before": {
    zIndex: -2,
    position: "absolute",

    // positions the center of the gradient box with the center of the button:
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    content: "",
    width: "100vw",
    height: "100vw",
    background: glowGradient,

    animation: glowAnimation,
  },

  ":after": {
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,

    content: "",
    borderRadius: `calc(${glowBorderRadius} - 1px)`,
    margin: glowBorderWidth,
    width: `calc(100% - ${glowBorderWidth} * 2)`,
    height: `calc(100% - ${glowBorderWidth} * 2)`,
    background: glowBackground,
  },
});

// ----------------------------------------------------------------------
// DON'T USE THESE CLASSES UNLESS YOU KNOW WHAT IT WAS MEANT FOR:
// Used to fix iOS behaviors:
// 1. Page will zoom in when an input with fontSize < 16px gets focus.
// 2. Page will scroll on input focus and breaks position: fixed / sticky
// ----------------------------------------------------------------------
export const resetFontSizeAndColor = style({
  fontSize: "16px !important",
  color: "rgba(0,0,0,0) !important",

  "::placeholder": {
    color: "rgba(0,0,0,0) !important",
  },
});

export const resetScrollBehavior = style({
  scrollBehavior: "auto",
});
// ----------------------------------------------------------------------
