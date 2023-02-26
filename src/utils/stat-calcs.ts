export const calcHP = (lvl: number, baseHP: number, sv: number, tv: number) =>
  Math.floor(
    ((1.5 * baseHP + sv + tv / 5) * lvl) / 80 +
      (sv * baseHP * lvl) / 20000 +
      lvl +
      15
  );
export const calcSTA = (lvl: number, baseSTA: number, sv: number, tv: number) =>
  Math.floor(
    baseSTA / 4 +
      Math.pow(lvl, 0.35) * 6 +
      (sv * lvl * baseSTA) / 20000 +
      (tv * lvl * baseSTA) / 30000
  );

export const calcStat = (
  lvl: number,
  baseStat: number,
  sv: number,
  tv: number
) =>
  Math.floor(
    ((1.5 * baseStat + sv + tv / 5) * lvl) / 100 +
      (sv * baseStat * lvl) / 25000 +
      10
  );
