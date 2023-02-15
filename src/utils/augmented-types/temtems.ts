export const validTypeElements = [
  "Digital",
  "Water",
  "Toxic",
  "Nature",
  "Wind",
  "Neutral",
  "Electric",
  "Melee",
  "Fire",
  "Earth",
  "Crystal",
  "Mental",
] as const;

export const validSources = [
  "Levelling",
  "Breeding",
  "TechniqueCourses",
] as const;

export const validIslands = [
  "Cipanku",
  "Deniz",
  "Tucma",
  "Omninesia",
  "Kisiwa",
  "Arbury",
] as const;
export const validEvolutionTreeTypes = ["levels", "trade", "special"] as const;
export const validFields = [
  "number",
  "name",
  "types",
  "portraitWikiUrl",
  "lumaPortraitWikiUrl",
  "wikiUrl",
  "stats",
  "traits",
  "details",
  "techniques",
  "trivia",
  "evolution",
  "wikiPortraitUrlLarge",
  "lumaWikiPortraitUrlLarge",
  "locations",
  "icon",
  "lumaIcon",
  "genderRatio",
  "catchRate",
  "hatchMins",
  "tvYields",
  "gameDescription",
  "wikiRenderStaticUrl",
  "wikiRenderAnimatedUrl",
  "wikiRenderStaticLumaUrl",
  "wikiRenderAnimatedLumaUrl",
  "renderStaticImage",
  "renderStaticLumaImage",
  "renderAnimatedImage",
  "renderAnimatedLumaImage",
] as const;

export type TypeElement = typeof validTypeElements[number];
export type Source = typeof validSources[number];
export type Island = typeof validIslands[number];
export type EvolutionTreeType = typeof validEvolutionTreeTypes[number];
export type Fields = typeof validFields[number];

export const isTypeElement = (str: any): str is TypeElement =>
  validTypeElements.some((type) => type === str);
export const isSource = (str: any): str is Source =>
  validSources.some((type) => type === str);
export const isIsland = (str: any): str is Island =>
  validIslands.some((type) => type === str);
export const isEvolutionTreeType = (str: any): str is EvolutionTreeType =>
  validEvolutionTreeTypes.some((type) => type === str);
export const isValidFields = (str: any): str is Fields =>
  validFields.some((type) => type === str);

export type Temtem = {
  number: number;
  name: string;
  types: TypeElement[];
  portraitWikiUrl: string;
  lumaPortraitWikiUrl: string;
  wikiUrl: string;
  stats: StatsWithTotal;
  traits: string[];
  details: Details;
  techniques: Technique[];
  trivia: string[];
  evolution: Evolution;
  wikiPortraitUrlLarge: string;
  lumaWikiPortraitUrlLarge: string;
  locations: Location[];
  icon: string;
  lumaIcon: string;
  genderRatio: GenderRatio;
  catchRate: number;
  hatchMins: number;
  tvYields: Stats;
  gameDescription: string;
  wikiRenderStaticUrl: string;
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
  renderStaticImage: string;
  renderStaticLumaImage: string;
  renderAnimatedImage: string;
  renderAnimatedLumaImage: string;
};

export type Details = {
  height: Height;
  weight: Weight;
};

export type Height = {
  cm: number;
  inches: number;
};

export type Weight = {
  kg: number;
  lbs: number;
};

export type Evolution = {
  evolves: boolean;
  stage?: number;
  evolutionTree?: EvolutionTree[];
  type?: EvolutionTreeType;
  from?: EvolutionTree | null;
  to?: EvolutionTree | null;
  number?: number;
  name?: string;
  level?: number;
  trading?: boolean;
  traits?: string[];
  traitMapping?: { [key: string]: string };
  description?: string;
};

export type EvolutionTree = {
  stage: number;
  number: number;
  name: string;
  level: number;
  type: EvolutionTreeType;
  trading: boolean;
  traits: string[];
  traitMapping: { [key: string]: string };
  description?: string;
};

export type GenderRatio = {
  male: number;
  female: number;
};

export type Location = {
  location: string;
  place: string;
  note: string;
  island: Island;
  frequency: string;
  level: string;
  freetem: Freetem;
};

export type Freetem = {
  minLevel: number;
  maxLevel: number;
  minPansuns: number | null;
  maxPansuns: number | null;
};

export type Technique = {
  name: string;
  source: Source;
  levels?: number;
};

// ---------- TYPES BELOW HERE ARE HAND CRAFTED FROM DATA ----------
export type Stats = {
  atk: number;
  def: number;
  hp: number;
  spatk: number;
  spd: number;
  spdef: number;
  sta: number;
};

export type StatsWithTotal = Stats & {
  total: number;
};
export type TypeMatchups = Record<TypeElement, number>;
export type TypeMatchupSquare = Record<
  TypeElement,
  Record<TypeElement, number>
>;
