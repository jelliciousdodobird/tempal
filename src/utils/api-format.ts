import { isTemType, TemType } from "./types";

export const formatTemType = (value: string): TemType => {
  const str = value.toLowerCase();
  if (isTemType(str)) return str;
  else return "neutral";
};
