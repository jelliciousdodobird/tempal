export const VALID_GEAR_FIELDS = [
  "name",
  "wikiUrl",
  "wikiIconUrl",
  "icon",
  "category",
  "consumable",
  "limitedQuantity",
  "purchasable",
  "buyPrice",
  "description",
  "gameDescription",
] as const;
export type GearField = typeof VALID_GEAR_FIELDS[number];
export const isGearField = (str: any): str is GearField =>
  VALID_GEAR_FIELDS.some((key) => key === str);

export type Gear = {
  name: string;
  wikiUrl: string;
  wikiIconUrl: string;
  icon: string;
  category: string;
  consumable: boolean;
  limitedQuantity: boolean;
  purchasable: boolean;
  buyPrice: number;
  description: string;
  gameDescription: string;
};
