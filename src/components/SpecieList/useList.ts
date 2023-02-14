"use client";
import Fuse from "fuse.js";
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
      const basicQuery = { [key]: adjustForNumberKey(key, query) };
      const andTokens = filterTrim(query.split(and));
      const orTokens = filterTrim(query.split(or));

      let finalQuery: string | Fuse.Expression = basicQuery;
      if (andTokens.length > 1 && orTokens.length > 1) {
        finalQuery = { "": "invalid key" };
      } else if (andTokens.length > 1) {
        finalQuery = {
          $and: andTokens.map((v) => ({ [key]: adjustForNumberKey(key, v) })),
        };
      } else if (orTokens.length > 1) {
        finalQuery = {
          $or: orTokens.map((v) => ({ [key]: adjustForNumberKey(key, v) })),
        };
      }

      const searchResults = searcher.search(finalQuery);

      const results = searchResults
        ? searchResults.map((v) => v.item)
        : species;
      const data = query === "" ? species : results;

      return data;
    },
    [searcher, species]
  );

  const { query } = useUrlQuery();

  const comparator = useCallback(
    getComparator(query.sortType, query.sortOrder),
    [query.sortType, query.sortOrder]
  );

  const resultsSortedByRelevance: MinimalTemSpecie[] = useMemo(() => {
    return search(query.filterType, query.filterValue);
  }, [search, query.filterType, query.filterValue]);

  const renderList = useMemo(
    () => [...resultsSortedByRelevance].sort(comparator),
    [resultsSortedByRelevance, comparator]
  );

  return { renderList };
};

const fuseKeysConfig: Record<
  FilterType,
  Fuse.FuseOptionKey<MinimalTemSpecie>
> = {
  name: {
    name: "name",
    getFn: (item) => {
      if (item.evolution.evolves) {
        return item.evolution.evolutionTree.map((evol) => evol.name).join(" ");
      }
      return item.name;
    },
  },
  number: {
    name: "number",
  },
  types: { name: "types" },
  traits: { name: "traits" },
};

const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);

const and = /\band\b|&/; // matches " and " or "&" (NOTE THE SPACES)
const or = /\bor\b|\|/; //  matches " or "  or "|" (NOTE THE SPACES)
const filterTrim = (stringArr: string[]) =>
  stringArr.map((v) => v.trim()).filter((v) => v !== "");

/**
 * Adjusts the query for an exact match if the filter key is "number". See https://fusejs.io/examples.html#extended-search
 * @param key
 * @param query
 * @returns
 */
const adjustForNumberKey = (key: FilterType, query: string) =>
  key === "number" ? "=" + query : query;
