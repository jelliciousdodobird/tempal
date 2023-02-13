export const validTemTypes = [
  "neutral",
  "wind",
  "earth",
  "water",
  "fire",
  "nature",
  "electric",
  "mental",
  "digital",
  "melee",
  "crystal",
  "toxic",
] as const;

export type TemType = typeof validTemTypes[number];
export const isTemType = (str: string): str is TemType =>
  validTemTypes.some((type) => type === str);

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

export interface Stats {
  atk: number;
  def: number;
  hp: number;
  spatk: number;
  spd: number;
  spdef: number;
  sta: number;
}

export interface StatsWithTotal extends Stats {
  total: number;
}

export interface API_TemData {
  name: string;
  number: number;
  types: [TemType, TemType | null];
  traits: [string, string];
  stats: StatsWithTotal;
  tvYields: Stats;

  wikiRenderStaticUrl: string;
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
}

export interface TemDexPageProps {
  tems: API_TemData[];
}
