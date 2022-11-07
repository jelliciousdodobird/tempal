import { createVar, globalKeyframes, style } from "@vanilla-extract/css";
import { hsla } from "./theme.util";
import { theme } from "./themes.css";

export const contentCenter = style({
  width: "clamp(300px, calc(50% + 100px), 1024px)",
  margin: "0 auto",

  "@media": {
    [`(max-width: 480px)`]: {
      width: "calc(100% - 2rem)",
    },
  },
});

export const flexCenter = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

//------------------------------------------------------------------
// ANIMATIONS:
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
//------------------------------------------------------------------
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
