"use client";
import Fuse from "fuse.js";
import { Key, useCallback, useMemo } from "react";
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
        threshold: 0.25,
      }),
    [species]
  );

  const search = useCallback(
    (key: FilterType, query: string) => {
      const basicQuery = getKeyedQuery(key, query);
      const andTokens = filterTrim(query.split(and));
      const orTokens = filterTrim(query.split(or));

      let finalQuery: string | Fuse.Expression = basicQuery;
      if (andTokens.length > 1 && orTokens.length > 1) {
        finalQuery = { "": "invalid key" };
      } else if (andTokens.length > 1) {
        finalQuery = {
          $and: andTokens.map((v) => getKeyedQuery(key, v)),
        };
      } else if (orTokens.length > 1) {
        finalQuery = {
          $or: orTokens.map((v) => getKeyedQuery(key, v)),
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

export type FuseKey = FilterType | "name_no_evo";
export type KeyedQuery = { [key in FuseKey]?: string };
export type KeyedQueryObject = { key: FuseKey; query: string };

const fuseKeysConfig: Record<FuseKey, Fuse.FuseOptionKey<MinimalTemSpecie>> = {
  name_no_evo: {
    // name_no_evo is a special case (it does not exist on MinimalTemSpecie):
    name: "name_no_evo",
    getFn: (item) => item.name,
  },
  name: {
    // by default, we want the filterType=name to include evolutions so we define getFn like so:
    name: "name",
    getFn: (item) =>
      item.evolution.evolves
        ? item.evolution.evolutionTree.map((evol) => evol.name)
        : item.name,
  },
  techniques: {
    name: "techniques",
    getFn: (item) => item.techniques.map((tech) => tech.name),
  },

  types: { name: "types" },
  traits: { name: "traits" },

  number: { name: "number" },
};

const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);

export const extendSearchTokens = /d/;
export const and = /\band\b|&/g; // matches " and " or "&" (NOTE THE SPACES)
export const or = /\bor\b|\|/g; //  matches " or "  or "|" (NOTE THE SPACES)
export const noEvoFlag = /\./g;

const filterTrim = (strings: string[]) =>
  strings.map((v) => v.trim()).filter((v) => v !== "");

const removeAllBooleans = (query: string) =>
  query.replace(and, "").replace(or, "");

/**
 * Adjusts the query for an exact match. See https://fusejs.io/examples.html#extended-search
 * @param query the query string to be adjusted
 * @returns the adjusted query string
 */
const forceExactMatch = (query: string) => "=" + query;

const forceNoEvo = (query: string): KeyedQueryObject => ({
  key: "name_no_evo",
  query: query.replace(noEvoFlag, ""),
});

// special conditions to check for:
const noEvoCondition = (key: FuseKey, query: string) =>
  key === "name" && !!query.match(noEvoFlag);

const exactNumberCondition = (key: FuseKey) => key === "number";

/**
 * Builds a query that handles edge cases
 * @param key
 * @param query
 * @returns
 */
const getKeyedQuery = (key: FuseKey, query: string): KeyedQuery => {
  // forces an exact match when search in the key "number"
  if (exactNumberCondition(key)) query = forceExactMatch(query);

  // adjust query&key for no evolution condition:
  if (noEvoCondition(key, query)) {
    const noEvolution = forceNoEvo(query);
    query = noEvolution.query;
    key = noEvolution.key;
  }

  query = removeAllBooleans(query);

  return { [key]: query };
};
