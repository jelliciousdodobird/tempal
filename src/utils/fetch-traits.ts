import { Trait, TraitField } from "./augmented-types/traits";

export type TraitQueryOptions = {
  names?: string[];
  fields?: TraitField[];
  limit?: number;
};

export type Maeels_API_Format_Trait = {
  names?: string;
  fields?: string;
  limit?: string;
};

export const fetchTraits = async (
  options?: TraitQueryOptions
): Promise<Trait[]> => {
  const opts: Maeels_API_Format_Trait = {};

  if (options) {
    const { names, fields, limit } = options;

    if (names) opts.names = names.join(",");
    if (fields) opts.fields = fields.join(",");
    if (limit) opts.limit = String(limit);
  }

  const params = new URLSearchParams(opts);
  const res = await fetch("https://temtem-api.mael.tech/api/traits?" + params);
  const rawData: Trait[] = await res.json();

  return rawData;
};
