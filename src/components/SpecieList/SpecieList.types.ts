import { useSearchParams } from "next/navigation";
import { MinTemtem } from "../../app/species/layout";

export const validFilterTypes = [
  "name",
  "types",
  "traits",
  "techniques",
  "number",
] as const;
export const validSortOrders = ["asc", "des"] as const;
export const validSortTypes = [
  "relevance",
  "number",
  "name",
  "base HP",
  "base stamina",
  "base speed",
  "base attack",
  "base defense",
  "base sp. attack",
  "base sp. defense",
  "HP TVs",
  "stamina TVs",
  "speed TVs",
  "attack TVs",
  "defense TVs",
  "sp. attack TVs",
  "sp. defense TVs",
] as const;

export type FilterType = typeof validFilterTypes[number];
export type SortType = typeof validSortTypes[number];
export type SortOrder = typeof validSortOrders[number];
export type NullableString = string | null | undefined;

export const isFilterType = (str: NullableString): str is FilterType =>
  validFilterTypes.some((order) => order === str);
export const isSortType = (str: NullableString): str is SortType =>
  validSortTypes.some((type) => type === str);
export const isSortOrder = (str: NullableString): str is SortOrder =>
  validSortOrders.some((order) => order === str);

export interface SortKey {
  value: SortType;
  label: string;
  accessor: (item: MinTemtem) => string | number;
}

export type SearchQuery = {
  filterType: FilterType;
  filterValue: string;
  sortType: SortType;
  sortOrder: SortOrder;
};

export type DirtyQuery = Record<keyof SearchQuery, NullableString>;
export type ReadOnlyURLSearchParams = ReturnType<typeof useSearchParams>;
