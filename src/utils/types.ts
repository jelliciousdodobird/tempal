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

export type TypeMatchups = Record<TemType, number>;

export type TypeMatchupSquare = Record<TemType, Record<TemType, number>>;

export type TemTypeColorShades = {
  base: string;
  dark: string;
  light: string;
};

export type TemTypeData = {
  index: number;
  colors: TemTypeColorShades;
  imgUrl: string;
};

export type TemTypeMap = Record<TemType, TemTypeData>;
