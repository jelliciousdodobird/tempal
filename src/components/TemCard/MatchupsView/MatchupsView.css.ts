// import {
//   createVar,
//   globalStyle,
//   style,
//   styleVariants,
// } from "@vanilla-extract/css";
// import { flexCenter } from "../../../styles/utility-styles.css";
// import { hsla } from "../../../styles/theme.util";
// import { theme, lightTheme, darkTheme } from "../../../styles/themes.css";

// export const matchupContainer = style({
//   // border: "1px dashed green",

//   width: "100%",
//   height: "100%",

//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   // justifyContent: "space-between",
// });

// export const matchupListWrapper = style({
//   // border: "1px dashed green",

//   position: "relative",

//   // background: hsla(theme.colors.white[2]),

//   border: `1px solid ${hsla(theme.colors.white[2])}`,

//   padding: 2,
//   borderRadius: 4,

//   width: "100%",

//   display: "flex",
//   flexDirection: "column",
//   gap: 4,
// });

// export const matchupList = style({
//   // outline: "1px solid red",
//   position: "relative",

//   // padding: 2,
//   // borderRadius: "0 0 8px 8px",
//   borderRadius: 4,

//   width: "100%",
//   // background: hsla(theme.colors.white[2]),

//   display: "flex",
//   gap: 2,
// });

// export const matchupLabel = style({
//   position: "relative",

//   borderRadius: 4,
//   padding: "3px 6px",

//   // width: "min-content",

//   // borderRadius: "8px 8px 0 0",
//   // marginBottom: 1,

//   // minHeight: "2rem",
//   // maxHeight: "2rem",
//   // height: "2rem",
//   background: hsla(theme.colors.white[3]),

//   whiteSpace: "nowrap",
//   // color: hsla(theme.colors.black[10]),
//   color: hsla(theme.colors.black[10], 0.7),

//   fontSize: 12,
//   fontWeight: 500,

//   display: "flex",
//   // justifyContent: "center",
//   alignItems: "center",
// });

// export const asteriskLabel = style({
//   position: "relative",
//   top: -5,
//   fontFamily: "Fira Code",
//   fontSize: 12,
//   fontWeight: 700,
//   color: hsla(theme.colors.negative[4]),
// });

// const magnitude_base_color = createVar();
// const magnitude_alt_color = createVar();

// export const matchupItemBase = style({
//   vars: {
//     [magnitude_base_color]: hsla(theme.colors.filler[0]),
//     [magnitude_alt_color]: hsla(theme.colors.filler[10]),
//   },

//   borderRadius: 4,

//   color: magnitude_alt_color,
//   fontWeight: 600,

//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: 2,
// });

// export const matchupItem = styleVariants({
//   super_effective: [
//     matchupItemBase,
//     {
//       vars: {
//         // [magnitude_alt_color]: hsla(theme.colors.filler[0]),
//         // [magnitude_base_color]: hsla(theme.colors.filler[2], 0.2),
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.filler[3]),
//       },
//     },
//   ],
//   effective: [
//     matchupItemBase,
//     {
//       vars: {
//         // [magnitude_alt_color]: hsla(theme.colors.positive[0]),
//         // [magnitude_base_color]: hsla(theme.colors.positive[3], 0.2),
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.positive[4]),
//       },
//     },
//   ],
//   neutral: [
//     matchupItemBase,
//     {
//       vars: {
//         // [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         // [magnitude_base_color]: hsla(theme.colors.white[4], 0.2),
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.black[5]),
//       },
//     },
//   ],
//   resistant: [
//     matchupItemBase,

//     {
//       vars: {
//         // [magnitude_alt_color]: hsla(theme.colors.caution[0]),
//         // [magnitude_base_color]: hsla(theme.colors.caution[3], 0.3),
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.caution[3]),
//       },
//     },
//   ],
//   super_resistant: [
//     matchupItemBase,
//     {
//       vars: {
//         // [magnitude_alt_color]: hsla(theme.colors.negative[3]),
//         // [magnitude_base_color]: hsla(theme.colors.negative[5], 0.2),
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.negative[3]),
//       },
//     },
//   ],
//   immune: [
//     matchupItemBase,
//     {
//       vars: {
//         [magnitude_alt_color]: hsla(theme.colors.white[0]),
//         [magnitude_base_color]: hsla(theme.colors.black[5]),
//         // [magnitude_alt_color]: hsla(theme.colors.black[5]),
//         // [magnitude_base_color]: hsla(theme.colors.black[5]),
//       },
//       // fontWeight: 400,
//     },
//   ],
// });

// export const matchupTypeValue = style({
//   // background: hsla(theme.colors.black[10]),

//   minWidth: 20,
//   minHeight: 20,

//   borderRadius: 4,
//   padding: "1px 4px",

//   // color: hsla(theme.colors.white[0]),

//   color: magnitude_alt_color,
//   background: magnitude_base_color,
//   // color: "white",
//   // background: magnitude_alt_color,

//   fontSize: 12,
//   fontFamily: "Fira Code",

//   fontWeight: "inherit",

//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// export const modalContainer = style({
//   // border: "1px solid red",
//   zIndex: 0,
//   position: "relative",
//   // top: 0,
//   // left: 0,

//   // padding: 5,
//   width: "100%",
//   height: "min-content",

//   display: "flex",
//   // justifyContent: "flex-end",
//   gap: "0.5rem",
// });

// export const questionButton = style([
//   flexCenter,
//   {
//     position: "relative",
//     cursor: "pointer",

//     background: "transparent",

//     borderRadius: 4,

//     width: "100%",

//     padding: "3px 6px",

//     color: hsla(theme.colors.black[8], 0.8),
//     fontSize: 12,
//     fontWeight: 400,

//     ":hover": {
//       background: hsla(theme.colors.white[3]),
//       color: hsla(theme.colors.black[0]),
//       textDecoration: "underline",
//     },

//     selectors: {
//       "&[data-opened=true]": {
//         background: hsla(theme.colors.white[3]),
//       },
//     },
//   },
// ]);

// const tooltipColor = createVar();
// const tooltipBg = createVar();

// export const tooltip = style({
//   vars: {
//     [tooltipColor]: hsla(theme.colors.black[5]),
//     [tooltipBg]: hsla(theme.colors.white[0]),
//   },
//   boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px 0px",
//   position: "absolute",

//   bottom: "calc(100% + 5px)",

//   borderRadius: 4,

//   color: tooltipColor,
//   background: tooltipBg,
//   backdropFilter: "blur(5px)",

//   padding: "1rem",

//   minWidth: "100%",
//   width: "100%",

//   display: "flex",
//   flexDirection: "column",
// });

// export const pg = style({
//   width: "100%",
//   whiteSpace: "pre-wrap",

//   fontWeight: 400,
//   fontSize: 12,
//   color: "inherit",
// });

// globalStyle(`${tooltip} > ${pg}:not(:last-child)`, {
//   paddingBottom: "0.8rem",
// });

// export const elementBox = style([
//   flexCenter,
//   {
//     width: "100%",
//     borderRadius: 4,
//   },
// ]);
export default {};
