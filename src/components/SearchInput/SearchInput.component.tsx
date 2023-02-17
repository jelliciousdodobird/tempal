"use client";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchFilterSelectMenu } from "../SearchFilterSelectMenu/SearchFilterSelectMenu.component";
import {
  FilterType,
  SearchQuery,
  validFilterTypes,
} from "../SpecieList/SpecieList.types";
import { getUpdatedQueryUrl } from "../SpecieList/SpecieList.utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";

export const SearchInput = () => {
  const router = useRouter();
  const { query, updateQueryUrl } = useUrlQuery();

  const [filterValue, setFilterValue] = useState<string>(query.filterValue);
  const debouncedFilterValue = useDebounce(filterValue, 500);

  const filterValues = useMemo(() => validFilterTypes.map((val) => val), []);

  const setUrlQuery = (newQuery: Partial<SearchQuery>) => {
    updateQueryUrl({ query: newQuery, updateType: "replace" });
  };

  const updateFilterType = (value: FilterType) => {
    setUrlQuery({ filterType: value, filterValue: "" });
    setFilterValue("");
  };

  const resetQueryFilter = () => setUrlQuery({ filterValue: "" });

  useEffect(() => {
    // by using getUpdatedQueryUrl() we can generate the url using native api's (outside of react state):
    const url = getUpdatedQueryUrl({ filterValue: debouncedFilterValue });

    // !!! DANGER DANGER DANGER !!!
    // In production, if you click on a link that takes you to "/species" (or any link that takes you to a page that loads this component)
    // getUpdatedQueryUrl() will return "/" which will take you straight back to the home page
    // because this useEffect will trigger (and therefore getUpdatedQueryUrl()) before the address bar updates with "/species".
    // To work around this we'll check if the url returned has atleast "species" otherwise we don't update the url by pushing.
    if (url.includes("species")) router.replace(url);
  }, [router, debouncedFilterValue]);

  return (
    <div
      className={clsx(
        "relative flex min-h-[2.5rem] w-full rounded-md text-base caret-white bg-neutral-800"
      )}
    >
      <SearchFilterSelectMenu
        value={query.filterType}
        onChange={updateFilterType}
        list={filterValues}
      />
      <Combobox.Input
        spellCheck={false}
        autoComplete="off"
        placeholder={placeholder_text[query.filterType]}
        className={clsx(
          "outline-none appearance-none",
          "flex px-3 h-full w-full rounded-md text-base caret-white bg-neutral-800",
          "placeholder:text-neutral-600"
        )}
        value={filterValue}
        displayValue={() => filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  );
};

export const auto_suggestions: Record<FilterType, string> = {
  name: "",
  types: "",
  traits: "",
  techniques: "",
  number: "",
};

export const placeholder_text: Record<FilterType, string> = {
  name: "tateru, saku, saipat, etc",
  types: "fire, water, wind, metal, etc",
  traits: "botanist, furor, hover",
  techniques: "water cannon",
  number: "1 - 164",
};
