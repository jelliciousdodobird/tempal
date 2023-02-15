import { Fields, Temtem } from "./augmented-types/temtems";

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

const validateNames = (names: string[]) => {
  const queryString = decodeURIComponent(
    names
      .map((name) =>
        name.length > 0 ? name[0].toUpperCase() + name.slice(1) : ""
      )
      .filter((name) => name !== "")
      .join(",")
  );

  return queryString;
};

export const fetchTemtem = async (
  options: TemtemQueryOptions = {}
): Promise<Temtem[]> => {
  const { names, fields, expand, weeknesses } = options;

  const opts: APIEnforcedFormat = {};
  if (names && names.length > 0) opts.names = validateNames(names);
  if (fields) opts.fields = fields.join(",");
  if (expand) opts.expand = expand.join(",");
  if (weeknesses !== undefined) opts.weeknesses = String(weeknesses);

  const params = new URLSearchParams(opts);
  const res = await fetch("https://temtem-api.mael.tech/api/temtems?" + params);
  const rawData: Temtem[] = await res.json();
  return rawData;
};
