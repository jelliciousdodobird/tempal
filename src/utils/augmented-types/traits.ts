export const VALID_TRAIT_FIELDS = [
  "name",
  "wikiUrl",
  "description",
  "effect",
] as const;
export type TraitField = typeof VALID_TRAIT_FIELDS[number];
export const isTraitField = (str: any): str is TraitField =>
  VALID_TRAIT_FIELDS.some((key) => key === str);

export type Trait = {
  name: string;
  wikiUrl: string;
  description: string;
  effect: string;
};
