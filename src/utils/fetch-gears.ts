import { Gear, GearField } from "./augmented-types/gear";

export type GearQueryOptions = {
  fields?: GearField[];
  limit?: number;
};

export type Maeels_API_Format_Gear = {
  fields?: string;
  limit?: string;
};

export const fetchGears = async (
  options?: GearQueryOptions
): Promise<Gear[]> => {
  const opts: Maeels_API_Format_Gear = {};

  if (options) {
    const { fields, limit } = options;
    if (fields) opts.fields = fields.join(",");
    if (limit) opts.limit = String(limit);
  }

  const params = new URLSearchParams(opts);
  const res = await fetch("https://temtem-api.mael.tech/api/gear?" + params);
  const rawData: Gear[] = await res.json();

  return rawData;
};
