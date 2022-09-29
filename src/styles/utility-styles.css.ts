import { style } from "@vanilla-extract/css";

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
