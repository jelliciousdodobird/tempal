import { getRandomIntInclusive } from "./utils";

// prettier-ignore
export const characters = ["Adia Turay", "Agustín", "Aina", "Archtamers", "Ariadne", "Asterion", "Carlos", "Dr. Sasaya", "General X", "Giada", "Giulia", "Lady Lottie", "Max", "Murdag", "Musa", "Octlana", "One-Eyed Matthew", "Percival", "Professor Konstantinos", "Rawiri", "Sophia", "Tihani", "Uncle Eulogi"];

// prettier-ignore
export const statuses = ["Asleep", "Burned", "Cold", "Frozen", "Exhausted", "Poisoned", "Alerted", "Evading", "Immune", "Invigorated", "Nullified", "Doomed"];

export const getRandomTeamName = () => {
  const rx = getRandomIntInclusive(0, statuses.length - 1);
  const ry = getRandomIntInclusive(0, characters.length - 1);
  return `${statuses[rx]} ${characters[ry]}`;
};
