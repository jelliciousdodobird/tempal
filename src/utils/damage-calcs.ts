import { matchupAlteringTraits, typeMatchupSquare } from "./data";
import { TemType, TypeMatchups } from "./types";

export const getTypeModifier = (attack: TemType, defend: TemType) =>
  typeMatchupSquare[attack][defend];

export const calculateBaseTypeModifier = (
  attack: TemType,
  defend1: TemType,
  defend2?: TemType | null
) => {
  const d1 = getTypeModifier(attack, defend1);
  const d2 = defend2 ? getTypeModifier(attack, defend2) : 1;
  return d1 * d2;
};

export const calculateTraitTypeModifier = (trait: string, attack: TemType) => {
  const traitModifier = matchupAlteringTraits.get(trait);

  if (!traitModifier) return 1;
  return traitModifier[attack];
};

export const calculateTypeModifier = (
  trait: string,
  attack: TemType,
  defend1: TemType,
  defend2?: TemType | null
) => {
  const baseTypeModifier = calculateBaseTypeModifier(attack, defend1, defend2);
  const traitTypeModifier = calculateTraitTypeModifier(trait, attack);

  let modifier = baseTypeModifier * traitTypeModifier;
  if (trait === "Attack<T>") modifier = modifier;
  else if (trait === "Adaptive") modifier = modifier;
  else if (trait === "Iridescence") modifier = 1 / baseTypeModifier;

  return modifier;
};

export const calculateMatchupModifiers = (
  trait: string,
  type1: TemType,
  type2?: TemType | null
): TypeMatchups => {
  const matchups: TypeMatchups = {
    neutral: 1,
    wind: 1,
    earth: 1,
    water: 1,
    fire: 1,
    nature: 1,
    electric: 1,
    mental: 1,
    digital: 1,
    melee: 1,
    crystal: 1,
    toxic: 1,
  };

  Object.keys(matchups).forEach((key) => {
    const attack = key as TemType;
    matchups[attack] = calculateTypeModifier(trait, attack, type1, type2);
  });

  return matchups;
};
