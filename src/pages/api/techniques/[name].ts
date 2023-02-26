import { NextApiRequest, NextApiResponse } from "next";
import {
  Class,
  FullTechnique,
  isClass,
  isTargeting,
  Targeting,
  TechDescription,
  TechniqueData,
} from "../../../utils/augmented-types/techniques";
import {
  isTypeElement,
  TypeElement,
} from "../../../utils/augmented-types/temtems";

import { Techniques as TEM_WIKI_TechniqueData } from "../../../utils/generated-types/techniques";

const endpoint = "https://temtem.wiki.gg/index.php?title=Special:CargoExport";
const baseQuery =
  "&tables=Techniques%2C&fields=Techniques.name%2C+Techniques.type%2C+Techniques.class%2C+Techniques.damage%2C+Techniques.hold%2C+Techniques.cost%2C+Techniques.priority%2C+Techniques.targeting%2C+Techniques.synergy_type%2C+Techniques.synergy_description%2C+Techniques.synergy_damage%2C+Techniques.synergy_sta%2C+Techniques.synergy_hold%2C+Techniques.synergy_priority%2C+Techniques.synergy_targeting%2C+Techniques.synergy_effects%2C&limit=500&format=json";

const dynamicPart = (name: string) =>
  `&where=Techniques.name%3D%22${encodeURIComponent(name)}%22`;

const getTemWikiQueryUrl = (name: string) =>
  endpoint + baseQuery + dynamicPart(name);

const parseTypeElement = (str: string): TypeElement => {
  const strs = str.length > 0 ? str[0].toUpperCase() + str.slice(1) : "";
  return isTypeElement(strs) ? strs : "Neutral";
};

const parseClass = (str: string): Class => {
  const s = str.toLowerCase();
  return isClass(s) ? s : "physical";
};

const parseTarget = (str: string): Targeting => {
  const s = str.toLowerCase();

  return isTargeting(s) ? s : "others";
};

const parseData = (data: TEM_WIKI_TechniqueData): TechniqueData => ({
  name: data.name ?? "",
  type: parseTypeElement(data.type ?? ""),
  class: parseClass(data.type ?? ""),
  damage: data.damage ?? 0,
  hold: data.hold ?? 0,
  cost: data.cost ?? 0,
  priority: data.priority ?? 0,
  targeting: parseTarget(data.targeting ?? ""),
  "synergy type":
    data["synergy type"] === null
      ? null
      : parseTypeElement(data["synergy type"]),
  "synergy description":
    data["synergy description"] === null
      ? null
      : data["synergy description"] ?? "",
  "synergy damage":
    data["synergy damage"] === null ? null : data["synergy damage"] ?? 0,
  "synergy sta": data["synergy sta"] === null ? null : data["synergy sta"] ?? 0,
  "synergy hold":
    data["synergy hold"] === null ? null : data["synergy hold"] ?? 0,
  "synergy priority":
    data["synergy priority"] === null ? null : data["synergy priority"] ?? 0,
  "synergy targeting":
    data["synergy targeting"] === null
      ? null
      : parseTarget(data["synergy targeting"] ?? ""),
  "synergy effects":
    data["synergy effects"] === null ? null : data["synergy effects"] ?? "",
});

const fetchTechniqueDescriptionFromMaeelApi = async (name: string) => {
  const params = new URLSearchParams({
    names: name,
    fields: "effectText,synergyText",
  });

  let data: TechDescription[];

  try {
    const res = await fetch(
      "https://temtem-api.mael.tech/api/techniques?" + params
    );
    data = await res.json();
  } catch (error) {
    console.error(error);
    data = [];
  }

  if (data && data.length === 0) return null;
  return data[0];
};

const fetchTechniqueDataFromTemWiki = async (name: string) => {
  let data: TechniqueData[];

  try {
    const res = await fetch(getTemWikiQueryUrl(name));
    const rawData: TEM_WIKI_TechniqueData[] = await res.json();
    data = rawData.map((data) => parseData(data));
  } catch (error) {
    console.error(error);
    data = [];
  }

  if (data && data.length === 0) return null;
  return data[0];
};

export default async function techniqueAPI(
  req: NextApiRequest,
  res: NextApiResponse<FullTechnique | null>
) {
  const { name } = req.query;
  const query = typeof name === "string" ? name : "";

  const [desc, tech] = await Promise.all([
    fetchTechniqueDescriptionFromMaeelApi(query),
    fetchTechniqueDataFromTemWiki(query),
  ]);

  if (!tech || !desc) return res.status(200).json(null);

  return res.status(200).json({ ...tech, ...desc });
}
