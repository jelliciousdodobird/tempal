import {
  Fields,
  isTypeElement,
  Technique,
  Temtem,
} from "./augmented-types/temtems";
import SubspecieData from "./special-case-data/subspecies.json";

export type TemtemQueryOptions = {
  names?: string[];
  fields?: Fields[];
  expand?: ("traits" | "techniques" | "types")[];
  weeknesses?: boolean;
};

export type APIEnforcedFormat = {
  names?: string;
  fields?: string;
  expand?: string;
  weeknesses?: string;
};

export const BASE_CHROMEON = "Chromeon (Digital)";
export const BASE_KOISH = "Koish (Water)";

const isChromeon = (name: string) => name.includes("Chromeon");
const isKoish = (name: string) => name.includes("Koish");
const isSubspecie = (name: string) => isChromeon(name) || isKoish(name);

const validateNames = (names: string[]) =>
  names
    .map((n) => decodeName(n))
    .filter((n) => n !== "")
    .map((n) => capitalizeName(n));

const decodeName = (name: string) => decodeURIComponent(name);
const capitalizeName = (name: string) =>
  name.length >= 2 ? name[0].toUpperCase() + name.slice(1) : "";

// maps each subspecies to its base form since the API we use doesn't have data on the alternate forms
const subspecieMapper = (name: string) => {
  if (isChromeon(name)) return BASE_CHROMEON;
  else if (isKoish(name)) return BASE_KOISH;
  else return name;
};

const mapSubspecieNames = (names: string[]) =>
  names.map((name) => subspecieMapper(name));

const getCommonTechniquesForSubspecies = (techs: Technique[]) => {
  const counts: { [tech: string]: number } = {};

  techs.forEach((tech) => {
    const count = counts[tech.name] ? counts[tech.name] : 0;
    counts[tech.name] = count + 1;
  });

  return Object.entries(counts)
    .filter(([tech, count]) => count > 1)
    .map(([tech]) => tech);
};

/**
 * Removes "/thumb" and "/55px-[name].png" from the URL to get the full portrait image.
 * @param url a URL in the form of https://temtem.wiki.gg/images/thumb/8/88/Mimit.png/55px-Mimit.png
 * @returns a URL of the full portrait image.
 */
const getFullVersionWikiPortraitUrl = (url: string) => {
  const i = url.indexOf(".png");
  const t = url.slice(0, i) + ".png";
  return t.replace("/thumb", "");
};

const isNotNull = <T>(argument: T | null): argument is T => {
  return argument !== null;
};

const isNotUndefined = <T>(argument: T | undefined): argument is T => {
  return argument !== undefined;
};

const safeCompareByNumber = (a: Temtem, b: Temtem) => {
  // the ?? checks if the "number" field is defined if not we make every entry equal essential:
  const a_num = a.number ?? 0;
  const b_num = b.number ?? 0;
  return a_num - b_num;
};

export const fetchTemtem = async (
  options: TemtemQueryOptions = {}
): Promise<Temtem[]> => {
  const { names, fields, expand, weeknesses } = options;

  const opts: APIEnforcedFormat = {};
  if (names) opts.names = validateNames(mapSubspecieNames(names)).join(",");
  if (fields) opts.fields = fields.join(",");
  if (expand) opts.expand = expand.join(",");
  if (weeknesses !== undefined) opts.weeknesses = String(weeknesses);

  const params = new URLSearchParams(opts);
  const res = await fetch("https://temtem-api.mael.tech/api/temtems?" + params);
  const rawData: Temtem[] = await res.json();

  // --------------------------------------------------------------------------
  // THE CODE BELOW THIS POINT MERGES OUR SUBSPECIES DATA
  const allSubspecieNames = SubspecieData.map((tem) => tem.subspeciesName);
  const requestedNames = validateNames(names || allSubspecieNames);
  const requestedSubspecies = requestedNames.filter((name) =>
    isSubspecie(name)
  );

  const chromeonBaseData = rawData.find((tem) => tem.name === BASE_CHROMEON);
  const chromeonCommonTechs = getCommonTechniquesForSubspecies(
    chromeonBaseData ? chromeonBaseData.techniques ?? [] : []
  );

  const koishBaseData = rawData.find((tem) => tem.name === BASE_KOISH);
  const koishCommonTechs = getCommonTechniquesForSubspecies(
    koishBaseData ? koishBaseData.techniques ?? [] : []
  );

  const subSpecies = requestedSubspecies
    .map((subspecie) => {
      if (isChromeon(subspecie) && chromeonBaseData) {
        const subspecieData = SubspecieData.find(
          (v) => v.subspeciesName === subspecie
        );

        const allTechs = chromeonBaseData.techniques ?? [];
        const specificTechs = subspecieData ? subspecieData.learnsets : [];
        const images = subspecieData ? subspecieData.images : null;
        const subType = subspecieData ? subspecieData.subspeciesType : null;

        const takeTheseTechs = [...chromeonCommonTechs, ...specificTechs];
        const techniques = takeTheseTechs
          .map((wantedTech) =>
            allTechs.find((tech) => tech.name === wantedTech)
          )
          .filter(isNotUndefined);

        let data: Temtem = { ...chromeonBaseData };

        if (chromeonBaseData.name) data.name = subspecie;
        if (chromeonBaseData.types && subType && isTypeElement(subType))
          data.types = [...data.types, subType];
        if (chromeonBaseData.techniques) data.techniques = techniques;
        if (images) {
          if (chromeonBaseData.portraitWikiUrl)
            data.portraitWikiUrl = images.portraitWikiUrl;
          if (chromeonBaseData.wikiRenderStaticUrl)
            data.wikiRenderStaticUrl = images.wikiRenderStaticUrl;
          if (chromeonBaseData.wikiRenderAnimatedUrl)
            data.wikiRenderAnimatedUrl = images.wikiRenderAnimatedUrl;
          if (chromeonBaseData.wikiRenderStaticLumaUrl)
            data.wikiRenderStaticLumaUrl = images.wikiRenderStaticLumaUrl;
          if (chromeonBaseData.wikiRenderAnimatedLumaUrl)
            data.wikiRenderAnimatedLumaUrl = images.wikiRenderAnimatedLumaUrl;
        }

        return data;
      } else if (isKoish(subspecie) && koishBaseData) {
        const subspecieData = SubspecieData.find(
          (v) => v.subspeciesName === subspecie
        );

        const allTechs = koishBaseData.techniques ?? [];
        const specificTechs = subspecieData ? subspecieData.learnsets : [];
        const images = subspecieData ? subspecieData.images : null;
        const subType = subspecieData ? subspecieData.subspeciesType : null;

        const takeTheseTechs = [...koishCommonTechs, ...specificTechs];
        const techniques = takeTheseTechs
          .map((wantedTech) =>
            allTechs.find((tech) => tech.name === wantedTech)
          )
          .filter(isNotUndefined);

        let data: Temtem = { ...koishBaseData };

        if (koishBaseData.name) data.name = subspecie;
        if (koishBaseData.types && subType && isTypeElement(subType))
          data.types = [...data.types, subType];
        if (koishBaseData.techniques) data.techniques = techniques;
        if (images) {
          if (koishBaseData.portraitWikiUrl)
            data.portraitWikiUrl = images.portraitWikiUrl;
          if (koishBaseData.wikiRenderStaticUrl)
            data.wikiRenderStaticUrl = images.wikiRenderStaticUrl;
          if (koishBaseData.wikiRenderAnimatedUrl)
            data.wikiRenderAnimatedUrl = images.wikiRenderAnimatedUrl;
          if (koishBaseData.wikiRenderStaticLumaUrl)
            data.wikiRenderStaticLumaUrl = images.wikiRenderStaticLumaUrl;
          if (koishBaseData.wikiRenderAnimatedLumaUrl)
            data.wikiRenderAnimatedLumaUrl = images.wikiRenderAnimatedLumaUrl;
        }
        return data;
      } else return null;
    })
    .filter(isNotNull);

  // remove any subspecies in the raw data, since we're merging them ourselves:
  const rawDataNoSubspecies = rawData.filter((tem) =>
    tem.name ? !isSubspecie(tem.name) : true
  );

  // merge and sort the data by number, if number is not available then list is unsorted:
  const mergedData = [...rawDataNoSubspecies, ...subSpecies].sort(
    safeCompareByNumber
  );

  // we want to transform the portraitWikiUrl to the full version:
  const parsedData = mergedData.map((tem) => {
    if (tem.portraitWikiUrl)
      return {
        ...tem,
        portraitWikiUrl: getFullVersionWikiPortraitUrl(tem.portraitWikiUrl),
      };
    else return tem;
  });

  return parsedData;
};
