import { ColorSpread, Theme } from "@emotion/react";
import {
  DEFAULT_DIMENSIONS,
  DEFAULT_FONT,
  DEFAULT_BREAKPOINTS,
} from "./Theme.defaults";

import { colord } from "colord";
import {
  createColorSpread as ccs,
  reverseColorSpread as reverse,
  repeatColorSpread as repeat,
} from "./Theme.utils";

export const themeList: Theme[] = [
  {
    id: "dark",
    dimensions: DEFAULT_DIMENSIONS,
    font: DEFAULT_FONT,
    breakpoints: DEFAULT_BREAKPOINTS,

    shadows: {
      _00: "rgb(0 0 0 / 20%) 0 0 12px", // toolbar shadow
      _10: "rgb(0 0 0 / 50%) 0 0 1px", // color preview shadow
      _20: "rgb(0 0 0 / 50%) 0 0 5px 0",
      _30: "rgb(0 0 0 / 15%) 0 0 5px 0",
      _50: "rgb(0 0 0 / 50%) 0 0 5px 0",
    },

    colors: {
      focal: ccs("hsl(200, 70%, 60%, 1)"),
      onFocal: repeat("hsl(0, 0%, 100%, 1)"),

      subfocal: ccs("hsl(0, 60%, 50%, 1)"),
      onSubfocal: repeat("hsl(0, 0%, 100%, 1)"),

      surface: ccs("hsl(0, 0%, 15%, 1)"),
      onSurface: ccs("hsl(0, 0%, 100%, 1)"),

      hypoface: ccs("hsl(0, 0%, 85%, 1)"),
      onHypoface: ccs("hsl(0, 0%, 0%, 1)"),

      // brand: {
      //   primary: ccs("hsl(200, 70%, 60%, 1)"),
      //   secondary: ccs("hsl(200, 70%, 60%, 1)"),
      // },

      // onBrand: {
      //   primary: ccs("hsl(0, 0%, 15%, 1)"),
      //   secondary: ccs("hsl(0, 0%, 85%, 1)"),
      // },

      // surface: {
      //   primary: ccs("hsl(0, 0%, 15%, 1)"),
      //   secondary: ccs("hsl(0, 0%, 85%, 1)"),
      // },

      // onSurface: {
      //   primary: ccs("hsl(0, 0%, 15%, 1)"),
      //   secondary: ccs("hsl(0, 0%, 85%, 1)"),
      // },

      // info: ccs({ B00: "#51acfe" }),
      // success: ccs({ B00: "#37d7b2", L10: "#00ffb1" }),
      // caution: ccs({ B00: "#ffcd4a" }),
      // danger: ccs({ B00: "#fb494a" }),
    },
  },
  {
    id: "light",
    dimensions: DEFAULT_DIMENSIONS,
    font: DEFAULT_FONT,
    breakpoints: DEFAULT_BREAKPOINTS,

    shadows: {
      _00: "rgb(0 0 0 / 5%) 0 0 10px", // toolbar shadow
      _10: "rgb(0 0 0 / 25%) 0 0 1px", // color preview shadow
      _20: "rgb(0 0 0 / 50%) 0 0 5px 0",
      _30: "rgb(0 0 0 / 15%) 0 0 5px 0",
      _50: "rgb(0 0 0 / 50%) 0 0 5px 0",
    },

    colors: {
      focal: ccs("hsl(200, 70%, 60%, 1)"),
      onFocal: repeat("hsl(0, 0%, 100%, 1)"),

      subfocal: ccs("hsl(0, 60%, 50%, 1)"),
      onSubfocal: repeat("hsl(0, 0%, 100%, 1)"),

      surface: reverse(ccs("hsl(0, 0%, 100%, 1)")),
      // surface: ccs("hsl(0, 0%, 97%, 1)"),
      onSurface: reverse(ccs("hsl(0, 0%, 15%, 1)")),

      hypoface: ccs("hsl(0, 0%, 0%, 1)"),
      onHypoface: ccs("hsl(0, 0%, 85%, 1)"),

      // brand: {
      //   primary: ccs("hsl(200, 70%, 60%, 1)"),
      //   secondary: ccs("hsl(200, 70%, 60%, 1)"),
      // },

      // onBrand: {
      //   primary: ccs("hsl(200, 70%, 60%, 1)"),
      //   secondary: ccs("hsl(200, 70%, 60%, 1)"),
      // },

      // surface: {
      //   primary: reverse(ccs("hsl(0, 0%, 100%, 1)")),
      //   secondary: reverse(ccs("hsl(0, 0%, 15%, 1)")),
      // },

      // onSurface: {
      //   primary: reverse(ccs("hsl(0, 0%, 15%, 1)")),
      //   secondary: reverse(ccs("hsl(0, 0%, 100%, 1)")),
      // },
    },
  },
];
// import { Theme } from "@emotion/react";
// import {
//   DEFAULT_DIMENSIONS,
//   DEFAULT_FONT,
//   DEFAULT_BREAKPOINTS,
// } from "./Theme.defaults";

// import { createColorSpread as ccs } from "./Theme.utils";

// export const themeList: Theme[] = [
//   {
//     id: "dark",
//     dimensions: DEFAULT_DIMENSIONS,
//     font: DEFAULT_FONT,
//     breakpoints: DEFAULT_BREAKPOINTS,

//     shadows: {
//       _00: "rgb(0 0 0 / 20%) 0 0 12px", // toolbar shadow
//       _10: "rgb(0 0 0 / 50%) 0 0 1px", // color preview shadow
//       _20: "rgb(0 0 0 / 50%) 0 0 5px 0",
//       _30: "rgb(0 0 0 / 15%) 0 0 5px 0",
//       _50: "rgb(0 0 0 / 50%) 0 0 5px 0",
//     },

//     colors: {
//       primary: ccs({ B00: "#49d0b0", D10: "#007258" }),
//       secondary: ccs({ B00: "#2dc3e9" }),

//       onPrimary: ccs({ B00: "#ffffff" }),
//       onSecondary: ccs({ B00: "#ffffff" }),

//       background: ccs({
//         L20: "#383838",
//         L10: "#272727",
//         B00: "#222222",
//         D10: "#1a1a1a",
//         D20: "#000000",
//       }),

//       surface: ccs({
//         L20: "#ffffff20", // used for on top of L10
//         L10: "rgba(70, 70, 70, 0.75)", // used for toolbar bg
//         B00: "#333333", // used for paper bg
//         D10: "#ffffff20",
//       }),

//       onBackground: ccs({
//         B00: "#ffffff",
//         D10: "#e6e6e7",
//         D20: "#e0e0e0",
//       }),

//       onSurface: ccs({
//         B00: "#ffffff", // text
//         D10: "#888888", // dot pattern color
//         D20: "#3b3b3b", // grid pattern color
//       }),

//       info: ccs({ B00: "#51acfe" }),
//       success: ccs({ B00: "#37d7b2", L10: "#00ffb1" }),
//       caution: ccs({ B00: "#ffcd4a" }),
//       danger: ccs({ B00: "#fb494a" }),
//     },
//   },
//   {
//     id: "light",
//     dimensions: DEFAULT_DIMENSIONS,
//     font: DEFAULT_FONT,
//     breakpoints: DEFAULT_BREAKPOINTS,

//     shadows: {
//       _00: "rgb(0 0 0 / 5%) 0 0 10px", // toolbar shadow
//       _10: "rgb(0 0 0 / 25%) 0 0 1px", // color preview shadow
//       _20: "rgb(0 0 0 / 50%) 0 0 5px 0",
//       _30: "rgb(0 0 0 / 15%) 0 0 5px 0",
//       _50: "rgb(0 0 0 / 50%) 0 0 5px 0",
//     },

//     colors: {
//       primary: ccs({ B00: "#49d0b0", L10: "#bbf3fb", D20: "#007258" }),
//       secondary: ccs({ B00: "#6c63ff" }),

//       onPrimary: ccs({ B00: "#ffffff" }),
//       onSecondary: ccs({ B00: "#000000" }),

//       background: ccs({
//         B00: "#f7f7f7",
//         D10: "#e9eef8",
//         D20: "#f6f6f6",
//       }),

//       surface: ccs({
//         L30: "#ffffff",
//         L20: "rgba(195, 195, 195, 0.2)",
//         L10: "rgba(255, 255, 255, 0.85)", // used for toolbar bg
//         B00: "#fafafa", // used for paper bg
//         D10: "rgba(195, 195, 195, 0.3)",
//         D20: "#e6e6e7",
//       }),

//       onBackground: ccs({ B00: "#2d4665" }),
//       onSurface: ccs({
//         B00: "#505050", // text
//         D10: "#aaaaaa", // dot pattern color
//         D20: "#eaeaea", // grid pattern color
//       }),

//       info: ccs({ B00: "#217aff" }),
//       success: ccs({ B00: "#37d7b2" }),
//       caution: ccs({ B00: "#fee257" }),
//       danger: ccs({ B00: "#ff3939", L10: "#fd5050" }),
//     },
//   },
// ];
