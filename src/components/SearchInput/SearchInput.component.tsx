"use client";

import clsx from "clsx";
import debounce from "lodash.debounce";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useRef, useCallback } from "react";
import { SearchFilterSelectMenu } from "../SearchFilterSelectMenu/SearchFilterSelectMenu.component";
import { getUpdatedQueryUrl } from "../SpecieList/SpecieList.utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import {
  FilterType,
  SearchQuery,
  validFilterTypes,
} from "../SpecieList/SpecieList.types";
import { IconSearch, IconX } from "@tabler/icons-react";

const DEBOUNCED_TIME = 300;

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const router = useRouter();
  const { query } = useUrlQuery();
  const [inputFilterValue, setInputFilterValue] = useState(query.filterValue);
  const filterValues = useMemo(() => validFilterTypes.map((val) => val), []);

  const safeUpdateUrlParams = (query: Partial<SearchQuery>) => {
    const url = getUpdatedQueryUrl(query);

    // url may be something like "/" but we only want to update the url if we're somehow in /species
    // this edge case can come up in a useEffect() when this component has loaded before the URL gets to update to "/species"
    if (url.includes("species")) router.replace(url);
  };

  const setUrlQuery = (query: Partial<SearchQuery>) => {
    const filterValue =
      query.filterValue === undefined
        ? inputRef.current.value
        : query.filterValue;
    setInputFilterValue(filterValue); // essential in keeping the inputFilterValue synced with the URL
    safeUpdateUrlParams({ ...query, filterValue });
  };

  const updateFilterType = (value: FilterType) => {
    setUrlQuery({ filterType: value, filterValue: "" }); // when filterType changes we also want to clear the search input
  };

  const updateUrl = useCallback(
    (filterValue: string) => safeUpdateUrlParams({ filterValue }),
    [router]
  );

  const debouncedUpdateUrl = useMemo(
    () => debounce(updateUrl, DEBOUNCED_TIME),
    [updateUrl]
  );

  const resetQueryFilter = () => {
    setUrlQuery({ filterValue: "" });
    inputRef?.current?.focus();
  };

  // We have two sources of truth for filterValue (yes I know anti-pattern but it's unavoidable in this case):
  // 1. [query.filterValue] represents the filter value from the search param from the URL.
  //    This is our ideal source of truth.
  // 2. [inputFilterValue] represents the what the user types.
  //    We cannot move this state to the URL because updating the URL on each input change causes performance issues.
  //    We cannot move [query.filterValue] down to this inputValue because we want the URL to have the filter value.
  //
  // CASE 1: [inputFilterValue] changes
  // [inputFilterValue] changes whenever the user types in the search input but [query.filterValue] is now stale.
  // Once they stop typing, which is implemented as a debounced function (debouncedUpdateUrl),
  // we update [query.filterValue] to the most current value of [inputFilterValue].
  // This syncs the URL state [query.filterValue] with the user input [inputFilterValue].
  // We have to use a debounced function instead of a useDebounce() hook because we must force a change in the URL
  // no matter what. Using a useDebounce hook on the [inputFilterValue] to detect a change  won't work because of an edge case
  // where between re-renders [inputFilterValue] can be the same value, which won't trigger a URL update.
  //
  // CASE 2: [query.filterValue] changes in two ways:
  //  i. There is a refresh/reload/navigation to the page that renders this component.
  //     We can keep the [inputFilterValue] from getting stale in the first place by
  //     giving the initial [inputFilterValue] the [query.filterValue] like so: useState(query.filterValue).
  // ii. There is a update to the URL using router.push()/replace() which may affect [query.filterValue].
  //     To solve this, I ignored all react state used safeUpdateUrlParams().

  return (
    <div className="relative flex min-h-[3rem] w-full rounded-lg text-base caret-white bg-neutral-800">
      <SearchFilterSelectMenu
        value={query.filterType}
        onChange={updateFilterType}
        list={filterValues}
      />
      <Combobox.Input
        ref={inputRef}
        spellCheck={false}
        autoComplete="off"
        placeholder={placeholder_text[query.filterType]}
        className={clsx(
          "outline-none appearance-none",
          "flex pl-3 h-full w-full text-base caret-white bg-neutral-800",
          "placeholder:text-neutral-600"
        )}
        disabled
        value={inputFilterValue}
        displayValue={() => inputFilterValue}
        onChange={(e) => {
          setInputFilterValue(e.target.value);
          debouncedUpdateUrl(e.target.value);
        }}
      />
      <button
        type="button"
        className="grid place-items-center h-full px-2 rounded-tr-lg rounded-br-lg outline-none appearance-none focus-visible:ring-1 ring-white ring-inset"
        onClick={resetQueryFilter}
      >
        {inputFilterValue === "" ? <IconSearch /> : <IconX />}
      </button>
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
  name: "tateru, saku, saipat",
  types: "fire, water, wind, mental",
  traits: "botanist, furor, hover",
  techniques: "scratch, water cannon",
  number: "1 - 164",
};
