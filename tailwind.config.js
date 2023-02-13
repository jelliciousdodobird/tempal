const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ["var(--font-fira_code)"], // overriding mono
    },
    extend: {
      colors: {
        primary: colors.indigo,
        neutral: {
          base: "hsl(180, 52%, 94%)",
          dark: "hsl(180, 52%, 34%)",
          light: "hsl(180, 52%, 94%)",
        },
        wind: {
          base: "hsl(162, 96%, 51%)",
          dark: "hsl(162, 96%, 21%)",
          light: "hsl(162, 96%, 51%)",
        },
        earth: {
          base: "hsl(19, 41%, 55%)",
          dark: "hsl(19, 41%, 25%)",
          light: "hsl(19, 41%, 55%)",
        },
        water: {
          base: "hsl(197, 100%, 64%)",
          dark: "hsl(197, 100%, 24%)",
          light: "hsl(197, 100%, 64%)",
        },
        fire: {
          base: "hsl(5, 77%, 61%)",
          dark: "hsl(5, 77%, 31%)",
          light: "hsl(5, 77%, 61%)",
        },
        nature: {
          base: "hsl(89, 61%, 67%)",
          dark: "hsl(89, 61%, 27%)",
          light: "hsl(89, 61%, 67%)",
        },
        electric: {
          base: "hsl(47, 100%, 73%)",
          dark: "hsl(47, 100%, 23%)",
          light: "hsl(47, 100%, 73%)",
        },
        mental: {
          base: "hsl(321, 43%, 59%)",
          dark: "hsl(321, 43%, 19%)",
          light: "hsl(321, 43%, 59%)",
        },
        digital: {
          base: "hsl(182, 19%, 70%)",
          dark: "hsl(182, 19%, 30%)",
          light: "hsl(182, 19%, 70%)",
        },
        melee: {
          base: "hsl(19, 94%, 68%)",
          dark: "hsl(19, 94%, 38%)",
          light: "hsl(19, 94%, 68%)",
        },
        crystal: {
          base: "hsl(349, 79%, 60%)",
          dark: "hsl(349, 79%, 30%)",
          light: "hsl(349, 79%, 60%)",
        },
        toxic: {
          base: "hsl(300, 3%, 35%)",
          dark: "hsl(300, 0%, 0%)",
          light: "hsl(300, 3%, 35%)",
        },
      },
      fontFamily: {
        base: ["var(--font-sora)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        center: "0 0 24px 0 rgba(0,0,0, 0.25)",
      },
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: 0 },
          "20%, 70%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in-out":
          "fade-in-out 0.5s cubic-bezier(.13,.74,.84,.43) 1 forwards",
        "gradient-x": "gradient-x 5s linear infinite",
        "gradient-y": "gradient-y 5s linear infinite",
        "gradient-xy": "gradient-xy 5s linear infinite",
      },
    },
  },
  plugins: [
    // require("@headlessui/tailwindcss"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
