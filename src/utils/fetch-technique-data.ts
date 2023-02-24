import {
  FullTechnique,
  TechniqueData,
  TechniqueDataField,
} from "./augmented-types/techniques";

export const fetchTechniqueData = async (
  techName: string
): Promise<FullTechnique | null> => {
  const res = await fetch("/api/techniques/" + encodeURIComponent(techName));
  const rawData: FullTechnique | null = await res.json();
  return rawData;
};

// export type TechniqueDataQueryOptions = {
//   names?: string[];
//   fields?: TechniqueDataField[];
//   limit?: number;
// };

// export type APIEnforcedFormatForTechniqueData = {
//   names?: string;
//   fields?: string;
//   limit?: string;
// };

// export const fetchTechniqueData = async (
//   options: TechniqueDataQueryOptions = {}
// ): Promise<TechniqueData[]> => {
//   const { names, fields, limit } = options;

//   const opts: APIEnforcedFormatForTechniqueData = {};
//   if (names) opts.names = names.join(",");
//   if (fields) opts.fields = fields.join(",");
//   if (limit) opts.limit = String(limit);

//   const params = new URLSearchParams(opts);
//   const res = await fetch(
//     "https://temtem-api.mael.tech/api/techniques?" + params
//   );
//   const rawData: TechniqueData[] = await res.json();

//   return rawData;
// };
