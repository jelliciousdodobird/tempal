import { TypeElement, TypeMatchups } from "./augmented-types/temtems";
import { matchupAlteringTraits, typeMatchupSquare } from "./data";

export const getTypeModifier = (attack: TypeElement, defend: TypeElement) =>
  typeMatchupSquare[attack][defend];

export const calculateBaseTypeModifier = (
  attack: TypeElement,
  defend1: TypeElement,
  defend2?: TypeElement | null
) => {
  const d1 = getTypeModifier(attack, defend1);
  const d2 = defend2 ? getTypeModifier(attack, defend2) : 1;
  return d1 * d2;
};

export const calculateTraitTypeModifier = (
  trait: string,
  attack: TypeElement
) => {
  const traitModifier = matchupAlteringTraits.get(trait);

  if (!traitModifier) return 1;
  return traitModifier[attack];
};

export const calculateTypeModifier = (
  trait: string,
  attack: TypeElement,
  defend1: TypeElement,
  defend2?: TypeElement | null
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
  type1: TypeElement,
  type2?: TypeElement | null
): TypeMatchups => {
  const matchups: TypeMatchups = {
    Neutral: 1,
    Wind: 1,
    Earth: 1,
    Water: 1,
    Fire: 1,
    Nature: 1,
    Electric: 1,
    Mental: 1,
    Digital: 1,
    Melee: 1,
    Crystal: 1,
    Toxic: 1,
  };

  Object.keys(matchups).forEach((key) => {
    const attack = key as TypeElement;
    matchups[attack] = calculateTypeModifier(trait, attack, type1, type2);
  });

  return matchups;
};
