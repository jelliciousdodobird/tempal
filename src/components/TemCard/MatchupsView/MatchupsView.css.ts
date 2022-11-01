import { style, styleVariants } from "@vanilla-extract/css";
import { flexCenter } from "../../../styles/utility-styles.css";
import { hsla } from "../../../styles/theme.util";
import { theme, lightTheme, darkTheme } from "../../../styles/themes.css";

export const matchupContainer = style({
  // border: "1px dashed green",

  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const matchupListWrapper = style({
  // border: "1px dashed green",

  width: "100%",

  display: "flex",
  flexDirection: "column",
});

export const matchupList = style({
  // outline: "1px solid red",
  position: "relative",

  padding: 8,
  borderRadius: "0 0 12px 12px",

  width: "100%",
  background: hsla(theme.colors.white[2]),

  display: "flex",
  gap: 2,
});

export const matchupLabel = style({
  position: "relative",

  borderRadius: "12px 12px 0 0",
  marginBottom: 1,

  minHeight: "2rem",
  maxHeight: "2rem",
  height: "2rem",
  background: hsla(theme.colors.white[3]),

  whiteSpace: "nowrap",
  color: hsla(theme.colors.black[10]),
  fontSize: 12,
  fontWeight: 500,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const asteriskLabel = style({
  position: "relative",
  top: -5,
  fontFamily: "Fira Code",
  fontSize: 14,
  fontWeight: 700,
  color: hsla(theme.colors.negative[4]),
});

export const matchupItem = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
});

export const baseMatchupTypeValue = style({
  background: hsla(theme.colors.black[10]),

  minWidth: 20,
  minHeight: 20,

  borderRadius: 4,
  padding: "1px 4px",

  color: hsla(theme.colors.white[0]),
  fontSize: 12,
  fontFamily: "Fira Code",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const matchupTypeValue = styleVariants({
  super_effective: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.white[0]),
      background: hsla(theme.colors.filler[2]),
      fontWeight: 600,
    },
  ],
  effective: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.white[0]),
      background: hsla(theme.colors.positive[3]),
      fontWeight: 600,
    },
  ],
  neutral: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.black[0]),
      background: hsla(theme.colors.white[4]),
      fontWeight: 400,
    },
  ],
  resistant: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.white[0]),
      background: hsla(theme.colors.caution[3]),
      fontWeight: 600,
    },
  ],
  super_resistant: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.white[0]),
      background: hsla(theme.colors.negative[5]),
      fontWeight: 600,
    },
  ],
  immune: [
    baseMatchupTypeValue,
    {
      color: hsla(theme.colors.white[0]),
      background: hsla(theme.colors.black[5]),
      fontWeight: 600,
    },
  ],
});

export const modalContainer = style({
  // border: "1px solid red",
  zIndex: 0,
  position: "absolute",

  padding: 5,
  width: "100%",

  display: "flex",
  justifyContent: "flex-end",
});

export const questionButton = style([
  flexCenter,
  {
    cursor: "pointer",

    background: hsla(theme.colors.white[6]),
    borderRadius: "50%",
    width: 20,
    height: 20,

    color: hsla(theme.colors.black[10]),
    fontSize: 12,
    fontWeight: 700,

    ":hover": {
      background: hsla(theme.colors.white[8]),
    },
  },
]);

export const tooltip = style({
  // border: "1px solid red",

  position: "absolute",
  bottom: "calc(100% + 5px)",
  right: 0,

  borderRadius: 10,
  background: hsla(theme.colors.white[2]),
  padding: "1rem",

  minWidth: "100%",
  width: "100%",

  display: "flex",
  flexDirection: "column",
});
