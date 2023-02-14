"use client";
import Fuse from "fuse.js";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { MinimalTemSpecie } from "../../app/species/layout";
import { FilterType } from "./SpecieList.types";
import { getComparator } from "./SpecieList.utils";
import { useUrlQuery } from "./useUrlQuery";

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
    (key: FilterType, query: string) => {
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

  // const params = useSearchParams();
  // const query = getQueryFromUrlParams(params);
  const { query } = useUrlQuery();

  const comparator = useCallback(
    () => getComparator(query.sortType, query.sortOrder),
    [query.sortType, query.sortOrder]
  );

  const resultsSortedByRelevance = useMemo(
    () => search(query.filterType, query.filterValue),
    [search, query.filterType, query.filterValue]
  );

  const renderList = useMemo(
    () => [...resultsSortedByRelevance].sort(comparator()),
    [resultsSortedByRelevance, comparator]
  );

  return { renderList };
};

const fuseKeysConfig: Record<
  FilterType,
  Fuse.FuseOptionKey<MinimalTemSpecie>
> = {
  name: { name: "name" },
  number: { name: "number" },
  types: { name: "types" },
  traits: { name: "traits" },
};
const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);
