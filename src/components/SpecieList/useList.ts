"use client";
import Fuse from "fuse.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MinimalTemSpecie } from "../../app/species/layout";
import { useDebounce } from "../../hooks/useDebounce";

export const useList = (species: MinimalTemSpecie[]) => {
  const searcher = useMemo(
    () =>
      new Fuse(species, {
        keys: fuseKeyData,
        useExtendedSearch: true,
        includeScore: true,
        shouldSort: true,
        threshold: 0.2,
      }),
    [species]
  );

  const search = useCallback(
    (key: FilterKey, query: string) => {
      const basicQuery = { [key]: query };

      const andTokens = query.split("&").map((v) => v.trim());
      const orTokens = query.split("|").map((v) => v.trim());

      let finalQuery: string | Fuse.Expression = basicQuery;
      if (andTokens.length > 1 && orTokens.length > 1) {
        finalQuery = { "": "invalid key" };
      } else if (andTokens.length > 1) {
        finalQuery = {
          $and: andTokens.map((v) => ({ [key]: v })),
        };
      } else if (orTokens.length > 1) {
        finalQuery = {
          $or: andTokens.map((v) => ({ [key]: v })),
        };
      }

      const searchResults = searcher.search(finalQuery);
      const results = searchResults
        ? searchResults.map((v) => v.item)
        : species;
      const data = query === "" ? species : results;

      // if (data !== species) setRange(STARTING_LIMIT); // reset the range
      return data;
    },

    [searcher, species]
  );

  // const router = useRouter();
  // const pathname = usePathname();
  const params = useSearchParams();
  const paramQuery = getQueryFromUrlParams(params);

  // const [query, setQuery] = useState<SearchQuery>(paramQuery);
  // const debouncedQuery = useDebounce(query, 500);

  const comparator = useCallback(
    () => getComparator(paramQuery.sortType, paramQuery.sortOrder),
    [paramQuery.sortType, paramQuery.sortOrder]
  );

  const resultsSortedByRelevance = useMemo(
    () => search(paramQuery.filterKey, paramQuery.value),
    [search, paramQuery.filterKey, paramQuery.value]
  );

  const results = useMemo(
    () => [...resultsSortedByRelevance].sort(comparator()),
    [resultsSortedByRelevance, comparator]
  );

  const renderList = results;

  // useEffect(() => {
  //   const query = cleanQuery(debouncedQuery);
  //   const queryString = getMinimalQueryString(query);
  //   router.replace(pathname + queryString);
  // }, [
  //   debouncedQuery.filterKey,
  //   debouncedQuery.sortOrder,
  //   debouncedQuery.sortType,
  //   debouncedQuery.value,
  //   pathname,
  // ]);

  // return { renderList, query, setQuery, paramQuery };
  return { renderList, paramQuery };
};

export type DirtyQuery = Record<keyof SearchQuery, string | null | undefined>;
export type ReadOnlyURLSearchParams = ReturnType<typeof useSearchParams>;

export const cleanQuery = (query: DirtyQuery): SearchQuery => {
  return {
    filterKey: isFilterKey(query.filterKey)
      ? query.filterKey
      : default_query.filterKey,
    sortType: isSortType(query.sortType)
      ? query.sortType
      : default_query.sortType,
    sortOrder: isSortOrder(query.sortOrder)
      ? query.sortOrder
      : default_query.sortOrder,
    value: query.value ?? default_query.value,
  };
};

export const getQueryFromUrlParams = (
  params: ReadOnlyURLSearchParams
): SearchQuery => {
  const filterKey = params.get("filterKey");
  const sortType = params.get("sortType");
  const sortOrder = params.get("sortOrder");
  const value = params.get("value");

  return cleanQuery({ filterKey, sortType, sortOrder, value });
};

export const getMinimalQuery = (query: SearchQuery): Partial<SearchQuery> => {
  const partialQuery: Partial<SearchQuery> = { ...query };
  if (partialQuery.filterKey === default_query.filterKey)
    delete partialQuery["filterKey"];
  if (partialQuery.sortType === default_query.sortType)
    delete partialQuery["sortType"];
  if (partialQuery.sortOrder === default_query.sortOrder)
    delete partialQuery["sortOrder"];
  if (partialQuery.value === default_query.value) delete partialQuery["value"];

  return partialQuery;
};

export const getMinimalQueryString = (query: SearchQuery) => {
  const minimalQuery = getMinimalQuery(query);
  const params = new URLSearchParams(minimalQuery);
  return "?" + params;
};

export const validFilterKeys = ["name", "number", "types", "traits"] as const;
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

export type FilterKey = typeof validFilterKeys[number];
export type SortType = typeof validSortTypes[number];
export type SortOrder = typeof validSortOrders[number];

export const isSortType = (str: string | null | undefined): str is SortType =>
  validSortTypes.some((type) => type === str);
export const isSortOrder = (str: string | null | undefined): str is SortOrder =>
  validSortOrders.some((order) => order === str);
export const isFilterKey = (str: string | null | undefined): str is FilterKey =>
  validFilterKeys.some((order) => order === str);

export interface SortKey {
  value: SortType;
  label: string;
  accessor: (item: MinimalTemSpecie) => string | number;
}

export type SearchQuery = {
  filterKey: FilterKey;
  sortType: SortType;
  sortOrder: SortOrder;
  value: string;
};

const fuseKeysConfig: Record<
  FilterKey,
  Fuse.FuseOptionKey<MinimalTemSpecie>
> = {
  name: { name: "name" },
  number: { name: "number" },
  types: { name: "types" },
  traits: { name: "traits" },
};
const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);

export const getComparator = (sortType: SortType, sortOrder: SortOrder) => {
  return (a: MinimalTemSpecie, b: MinimalTemSpecie) => {
    const sortKey = sortItems[sortType];
    const x = sortKey.accessor(a);
    const y = sortKey.accessor(b);
    const order = sortOrder === "asc" ? 1 : -1;

    if (typeof x === "number" && typeof y === "number") return order * (x - y);
    else if (typeof x === "string" && typeof y === "string")
      return order * x.localeCompare(y);
    else return 0;
  };
};

export const sortOrderDescription: Record<
  SortOrder,
  { word: string; desc: string }
> = {
  asc: { word: "ascending", desc: "low to high" },
  des: { word: "descending", desc: "high to low" },
};

export const sortItems: Record<SortType, SortKey> = {
  relevance: {
    value: "relevance",
    label: "Relevance",
    accessor: (item: MinimalTemSpecie) => 0,
  },
  number: {
    value: "number",
    label: "Number",
    accessor: (item: MinimalTemSpecie) => item.number,
  },
  name: {
    value: "name",
    label: "Name",
    accessor: (item: MinimalTemSpecie) => item.name,
  },
  "base HP": {
    value: "base HP",
    label: "HP",
    accessor: (item: MinimalTemSpecie) => item.stats.hp,
  },
  "base stamina": {
    value: "base stamina",
    label: "Stamina",
    accessor: (item: MinimalTemSpecie) => item.stats.sta,
  },
  "base speed": {
    value: "base speed",
    label: "Speed",
    accessor: (item: MinimalTemSpecie) => item.stats.spd,
  },
  "base attack": {
    value: "base attack",
    label: "Attack",
    accessor: (item: MinimalTemSpecie) => item.stats.atk,
  },
  "base defense": {
    value: "base defense",
    label: "Defense",
    accessor: (item: MinimalTemSpecie) => item.stats.def,
  },
  "base sp. attack": {
    value: "base sp. attack",
    label: "Sp. Atk",
    accessor: (item: MinimalTemSpecie) => item.stats.spatk,
  },
  "base sp. defense": {
    value: "base sp. defense",
    label: "Sp. Def",
    accessor: (item: MinimalTemSpecie) => item.stats.spdef,
  },
  "HP TVs": {
    value: "HP TVs",
    label: "HP",
    accessor: (item: MinimalTemSpecie) => item.tvYields.hp,
  },
  "stamina TVs": {
    value: "stamina TVs",
    label: "Stamina",
    accessor: (item: MinimalTemSpecie) => item.tvYields.sta,
  },
  "speed TVs": {
    value: "speed TVs",
    label: "Speed",
    accessor: (item: MinimalTemSpecie) => item.tvYields.spd,
  },
  "attack TVs": {
    value: "attack TVs",
    label: "Attack",
    accessor: (item: MinimalTemSpecie) => item.tvYields.atk,
  },
  "defense TVs": {
    value: "defense TVs",
    label: "Defense",
    accessor: (item: MinimalTemSpecie) => item.tvYields.def,
  },
  "sp. attack TVs": {
    value: "sp. attack TVs",
    label: "Sp. Atk",
    accessor: (item: MinimalTemSpecie) => item.tvYields.spatk,
  },
  "sp. defense TVs": {
    value: "sp. defense TVs",
    label: "Sp. Def",
    accessor: (item: MinimalTemSpecie) => item.tvYields.spdef,
  },
};

const default_query: SearchQuery = {
  filterKey: "name",
  sortType: "relevance",
  sortOrder: "des",
  value: "",
};
