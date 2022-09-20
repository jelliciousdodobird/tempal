import { colord } from "colord";

export type TemType =
  | "neutral"
  | "wind"
  | "earth"
  | "water"
  | "fire"
  | "nature"
  | "electric"
  | "mental"
  | "digital"
  | "melee"
  | "crystal"
  | "toxic";

type TypeSquare = Record<TemType, Record<TemType, number>>;

export const typeSquare: TypeSquare = {
  neutral: {
    neutral: 1,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 0.5,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 1,
  },
  wind: {
    neutral: 1,
    wind: 0.5,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 0.5,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 2,
  },
  earth: {
    neutral: 1,
    wind: 0.5,
    earth: 1,
    water: 0.5,
    fire: 2,
    nature: 0.5,
    electric: 2,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 2,
    toxic: 1,
  },
  water: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 0.5,
    fire: 2,
    nature: 0.5,
    electric: 1,
    mental: 1,
    digital: 2,
    melee: 1,
    crystal: 1,
    toxic: 0.5,
  },
  fire: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 0.5,
    fire: 0.5,
    nature: 2,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 2,
    toxic: 1,
  },
  nature: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 2,
    fire: 0.5,
    nature: 0.5,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 0.5,
  },
  electric: {
    neutral: 1,
    wind: 2,
    earth: 0.5,
    water: 2,
    fire: 1,
    nature: 0.5,
    electric: 0.5,
    mental: 2,
    digital: 2,
    melee: 1,
    crystal: 0.5,
    toxic: 1,
  },
  mental: {
    neutral: 2,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 2,
    crystal: 0.5,
    toxic: 1,
  },
  digital: {
    neutral: 1,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 2,
    digital: 2,
    melee: 2,
    crystal: 1,
    toxic: 1,
  },
  melee: {
    neutral: 1,
    wind: 1,
    earth: 2,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 0.5,
    digital: 1,
    melee: 0.5,
    crystal: 2,
    toxic: 1,
  },
  crystal: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 1,
    fire: 0.5,
    nature: 1,
    electric: 2,
    mental: 2,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 1,
  },
  toxic: {
    neutral: 1,
    wind: 1,
    earth: 0.5,
    water: 2,
    fire: 1,
    nature: 2,
    electric: 1,
    mental: 1,
    digital: 0.5,
    melee: 1,
    crystal: 0.5,
    toxic: 0.5,
  },
};

export type TemTypeColorShades = {
  base: string;
  dark: string;
  light: string;
};

export type TemTypeColor = Record<TemType, TemTypeColorShades>;

export const temTypeColorMap: TemTypeColor = {
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
    dark: "hsl(300, 3%, 5%)",
    light: "hsl(300, 3%, 35%)",
  },
};

export const temtems = {};
