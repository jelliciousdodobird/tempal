import { Icon, IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { MinTemtem } from "../../app/species/layout";
import Fuse from "fuse.js";

import {
  DirtyQuery,
  SearchQuery,
  isFilterType,
  isSortType,
  isSortOrder,
  ReadOnlyURLSearchParams,
  SortType,
  SortKey,
  SortOrder,
} from "./SpecieList.types";

export const default_query: SearchQuery = {
  filterType: "name",
  filterValue: "",
  sortType: "relevance",
  sortOrder: "des",
};

export const cleanQuery = (query: DirtyQuery): SearchQuery => {
  return {
    filterType: isFilterType(query.filterType)
      ? query.filterType
      : default_query.filterType,
    sortType: isSortType(query.sortType)
      ? query.sortType
      : default_query.sortType,
    sortOrder: isSortOrder(query.sortOrder)
      ? query.sortOrder
      : default_query.sortOrder,
    filterValue: query.filterValue ?? default_query.filterValue,
  };
};

export const getMinimalQuery = (query: SearchQuery): Partial<SearchQuery> => {
  const partialQuery: Partial<SearchQuery> = { ...query };
  if (partialQuery.filterType === default_query.filterType)
    delete partialQuery["filterType"];
  if (partialQuery.filterValue === default_query.filterValue)
    delete partialQuery["filterValue"];
  if (partialQuery.sortType === default_query.sortType)
    delete partialQuery["sortType"];
  if (partialQuery.sortOrder === default_query.sortOrder)
    delete partialQuery["sortOrder"];

  return partialQuery;
};

export const minimalQueryToUrl = (
  minimalQuery: Partial<SearchQuery>
): string => {
  const params = new URLSearchParams(minimalQuery);
  return "?" + params;
};

export const getMinimalQueryString = (query: SearchQuery) => {
  const minimalQuery = getMinimalQuery(query);
  return minimalQueryToUrl(minimalQuery);
};

export const getQuery = (
  params?: ReadOnlyURLSearchParams | URLSearchParams
): SearchQuery => {
  const searchParams = params ?? new URLSearchParams(window.location.href);
  const filterType = searchParams.get("filterType");
  const filterValue = searchParams.get("filterValue");
  const sortType = searchParams.get("sortType");
  const sortOrder = searchParams.get("sortOrder");

  return cleanQuery({ filterType, sortType, sortOrder, filterValue });
};

/**
 * Generates a new url given the updatedQuery with respect to the current url pathname and search params. This is done outside of react state.
 * @param updatedQuery what query values you want to change
 * @returns a url string in the form "/current/path/name" + "?" + "filterType=value&filterValue=value&sortType=value&sortOrder=value". Note, it is possible for this function to return just "/?" which will send you to the index page.
 */
export const getUpdatedQueryUrl = (updatedQuery: Partial<SearchQuery>) => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const currentQuery = getQuery(searchParams);
  const queryString = getMinimalQueryString({
    ...currentQuery,
    ...updatedQuery,
  });

  return pathname + queryString;
};

export const getComparator = (sortType: SortType, sortOrder: SortOrder) => {
  return (a: Fuse.FuseResult<MinTemtem>, b: Fuse.FuseResult<MinTemtem>) => {
    const sortKey = SORT_TYPE_MAP[sortType];
    const x = sortKey.resultAccessor(a);
    const y = sortKey.resultAccessor(b);
    const order = sortOrder === "asc" ? 1 : -1;

    if (typeof x === "number" && typeof y === "number") return order * (x - y);
    else if (typeof x === "string" && typeof y === "string")
      return order * x.localeCompare(y);
    else return 0;
  };
};

export const sortOrderDescription: Record<
  SortOrder,
  { word: string; desc: string; icon: Icon }
> = {
  asc: { word: "ascending", desc: "low to high", icon: IconArrowUp },
  des: { word: "descending", desc: "high to low", icon: IconArrowDown },
};

export const SORT_TYPE_MAP: Record<SortType, SortKey> = {
  relevance: {
    value: "relevance",
    label: "Relevance",
    shortLabel: "Relevance",
    resultAccessor: (item) => -(item.score ?? 0), // lower score means higher relevance
    accessor: (tem) => 0, // lower score means higher relevance
  },
  number: {
    value: "number",
    label: "Number",
    shortLabel: "Num",
    resultAccessor: (item) => item.item.number,
    accessor: (tem) => tem.number,
  },
  name: {
    value: "name",
    label: "Name",
    shortLabel: "Name",
    resultAccessor: (item) => item.item.name,
    accessor: (tem) => tem.name,
  },
  "base HP": {
    value: "base HP",
    label: "HP",
    shortLabel: "HP",
    resultAccessor: (item) => item.item.stats.hp,
    accessor: (tem) => tem.stats.hp,
  },
  "base stamina": {
    value: "base stamina",
    label: "Stamina",
    shortLabel: "STA",
    resultAccessor: (item) => item.item.stats.sta,
    accessor: (tem) => tem.stats.sta,
  },
  "base speed": {
    value: "base speed",
    label: "Speed",
    shortLabel: "SPD",
    resultAccessor: (item) => item.item.stats.spd,
    accessor: (tem) => tem.stats.spd,
  },
  "base attack": {
    value: "base attack",
    label: "Attack",
    shortLabel: "ATK",
    resultAccessor: (item) => item.item.stats.atk,
    accessor: (tem) => tem.stats.atk,
  },
  "base defense": {
    value: "base defense",
    label: "Defense",
    shortLabel: "DEF",
    resultAccessor: (item) => item.item.stats.def,
    accessor: (tem) => tem.stats.def,
  },
  "base sp. attack": {
    value: "base sp. attack",
    label: "Sp. Atk",
    shortLabel: "SP ATK",
    resultAccessor: (item) => item.item.stats.spatk,
    accessor: (tem) => tem.stats.spatk,
  },
  "base sp. defense": {
    value: "base sp. defense",
    label: "Sp. Def",
    shortLabel: "SP DEF",
    resultAccessor: (item) => item.item.stats.spdef,
    accessor: (tem) => tem.stats.spdef,
  },
  "HP TVs": {
    value: "HP TVs",
    label: "HP",
    shortLabel: "HP",
    resultAccessor: (item) => item.item.tvYields.hp,
    accessor: (tem) => tem.tvYields.hp,
  },
  "stamina TVs": {
    value: "stamina TVs",
    label: "Stamina",
    shortLabel: "STA",
    resultAccessor: (item) => item.item.tvYields.sta,
    accessor: (tem) => tem.tvYields.sta,
  },
  "speed TVs": {
    value: "speed TVs",
    label: "Speed",
    shortLabel: "SPD",
    resultAccessor: (item) => item.item.tvYields.spd,
    accessor: (tem) => tem.tvYields.spd,
  },
  "attack TVs": {
    value: "attack TVs",
    label: "Attack",
    shortLabel: "ATK",
    resultAccessor: (item) => item.item.tvYields.atk,
    accessor: (tem) => tem.tvYields.atk,
  },
  "defense TVs": {
    value: "defense TVs",
    label: "Defense",
    shortLabel: "DEF",
    resultAccessor: (item) => item.item.tvYields.def,
    accessor: (tem) => tem.tvYields.def,
  },
  "sp. attack TVs": {
    value: "sp. attack TVs",
    label: "Sp. Atk",
    shortLabel: "SP ATK",
    resultAccessor: (item) => item.item.tvYields.spatk,
    accessor: (tem) => tem.tvYields.spatk,
  },
  "sp. defense TVs": {
    value: "sp. defense TVs",
    label: "Sp. Def",
    shortLabel: "SP DEF",
    resultAccessor: (item) => item.item.tvYields.spdef,
    accessor: (tem) => tem.tvYields.spdef,
  },
};
