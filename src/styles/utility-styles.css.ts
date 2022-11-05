import { globalKeyframes, style } from "@vanilla-extract/css";

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
