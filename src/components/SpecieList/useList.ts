"use client";

import Fuse from "fuse.js";
import { useMemo } from "react";
import { MinTemtem } from "../../app/(explore)/layout";
import { FilterType } from "./SpecieList.types";
import { getComparator } from "./SpecieList.utils";
import { useUrlQuery } from "./useUrlQuery";

export const useList = (species: MinTemtem[]) => {
  const search = useMemo(() => {
    const searcher = new Fuse(species, {
      keys: fuseKeyData,
      useExtendedSearch: true,
      includeScore: true,
      // shouldSort: true, // since we're sorting everything including the score ourselves
      threshold: 0.25,
    });

    return (key: FilterType, query: string) => {
      if (query === "")
        return species.map(
          (item, i): Fuse.FuseResult<MinTemtem> => ({
            item,
            refIndex: i,
            score: i, // lower score means higher relevance
          })
        );

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

      return searchResults;
    };
  }, [species]);

  const { query } = useUrlQuery();

  const comparator = useMemo(
    () => getComparator(query.sortType, query.sortOrder),
    [query.sortType, query.sortOrder]
  );

  const results = useMemo(
    () => search(query.filterType, query.filterValue),
    [search, query.filterType, query.filterValue]
  );

  const processedList = useMemo(
    () => [...results].sort(comparator).map((item) => item.item),
    [results, comparator]
  );

  return { processedList };
};

export type FuseKey = FilterType | "name_with_evo";
export type KeyedQuery = { [key in FuseKey]?: string };
export type KeyedQueryObject = { key: FuseKey; query: string };

const fuseKeysConfig: Record<FuseKey, Fuse.FuseOptionKey<MinTemtem>> = {
  name_with_evo: {
    // name_with_evo is a special case for the filterType=name (it does not exist on MinTemtem):
    name: "name_with_evo",
    getFn: (item) =>
      item.evolution.evolutionTree?.map((evol) => evol.name) ?? item.name,
  },
  name: { name: "name" },
  types: { name: "types" },
  traits: { name: "traits" },
  number: { name: "number" },
  techniques: {
    name: "techniques",
    getFn: (item) => item.techniques.map((tech) => tech.name),
  },
};

const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);

export const and = /\band\b|&/g; // matches " and " or "&" (NOTE THE SPACES)
export const or = /\bor\b|\|/g; //  matches " or "  or "|" (NOTE THE SPACES)
export const evolutionFlag = /\+/g; //  matches a "+" (plus sign)

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

const forceShowEvolutions = (query: string): KeyedQueryObject => ({
  key: "name_with_evo",
  query: query.replace(evolutionFlag, ""),
});

// special conditions to check for:
const shouldShowEvolution = (key: FuseKey, query: string) =>
  key === "name" && !!query.match(evolutionFlag);

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

  // adjust query&key for evolution condition:
  if (shouldShowEvolution(key, query)) {
    const evolutionGroupQuery = forceShowEvolutions(query);
    query = evolutionGroupQuery.query;
    key = evolutionGroupQuery.key;
  }

  query = removeAllBooleans(query);

  return { [key]: query };
};
