"use client";

import clsx from "clsx";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { FilterMenu } from "../FilterMenu/FilterMenu.component";
import { getUpdatedQueryUrl } from "../SpecieList/SpecieList.utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import { IconSearch, IconX } from "@tabler/icons-react";
import { SortMenu } from "../SortMenu/SortMenu.component";
import { MinTemtem } from "../../app/(explore)/layout";
import { getSpecieLinkId } from "../SpecieList/SpecieList.component";
import { clamp } from "../../utils/utils";
import {
  FilterType,
  SearchQuery,
  validFilterTypes,
} from "../SpecieList/SpecieList.types";
import {
  useState,
  useMemo,
  useCallback,
  MutableRefObject,
  SetStateAction,
  Dispatch,
  forwardRef,
  KeyboardEventHandler,
} from "react";

const DEBOUNCED_TIME = 300;

type SearchInputProps = {
  // these props help implement arrow key navigation for keyboard accessibility
  ignoreBlur: MutableRefObject<boolean>;
  renderList: MinTemtem[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { renderList, active, setActive, ignoreBlur },
    inputRef
  ) {
    const router = useRouter();
    const { query } = useUrlQuery();
    const [inputFilterValue, setInputFilterValue] = useState(query.filterValue);
    const filterValues = useMemo(() => validFilterTypes.map((val) => val), []);

    const safeUpdateUrlParams = (query: Partial<SearchQuery>) => {
      const url = getUpdatedQueryUrl(query);

      // url may be something like "/" but we only want to update the url if we're in the route group (explore) so /specie or /team
      // this edge case can come up in a useEffect() when this component has loaded before the URL gets to update to "/species" or "/team"
      if (url.includes("species") || url.includes("team")) router.replace(url);
    };

    const setUrlQuery = (query: Partial<SearchQuery>) => {
      if (inputRef === null || typeof inputRef === "function") return;

      const filterValue =
        query.filterValue === undefined
          ? inputRef.current?.value ?? ""
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
      if (inputRef === null || typeof inputRef === "function") return;

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

    const updateFocusedElement = (updateType: "increase" | "decrease") => {
      const scalar = updateType === "increase" ? 1 : -1;

      const activeIndex = renderList.findIndex(
        ({ name }) => getSpecieLinkId(name) === active
      );
      const activeItem = renderList[activeIndex];

      // if theres an active item, move to the next/prev item:
      if (activeItem) {
        const nextIndex = (activeIndex + scalar) % renderList.length;
        const i = clamp(nextIndex, 0, renderList.length - 1);
        if (i === activeIndex) return;

        const name = renderList[i].name;
        const id = getSpecieLinkId(name);

        const el = document.getElementById(id);
        if (!el) return;
        ignoreBlur.current = true;
        el.focus();
        setActive(id);
      }
      // otherwise move to the first item:
      else {
        const name = renderList[0].name;
        const id = getSpecieLinkId(name);

        const el = document.getElementById(id);
        if (!el) return;
        ignoreBlur.current = true;
        el.focus();
        setActive(id);
      }
    };

    const arrowKeyNav: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (!(renderList.length > 0)) {
        setActive("");
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
        e.stopPropagation();
        e.preventDefault();
      }

      if (e.key === "ArrowUp") updateFocusedElement("decrease");
      else if (e.key === "ArrowDown") updateFocusedElement("increase");
      else if (e.key === "Enter") {
        const el = document.getElementById(active);
        if (!el) return;
        el.click();
      }
    };

    const unfocusItemLinks = () => {
      if (!ignoreBlur.current) setActive("");
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="group relative flex min-h-[3rem] overflow-hidden w-full rounded-lg text-base caret-white bg-neutral-800">
          <div className="absolute bottom-0 left-0 w-full h-[2px] group-focus-within:bg-neutral-500/50" />
          <button
            type="button"
            className="grid place-items-center pl-3 pr-2 rounded-tl-lg rounded-bl-lg outline-none appearance-none focus-visible:ring-1 ring-white ring-inset text-neutral-500 "
            onClick={resetQueryFilter}
          >
            {inputFilterValue === "" ? <IconSearch /> : <IconX />}
          </button>
          <input
            type="text"
            ref={inputRef}
            spellCheck={false}
            autoComplete="off"
            placeholder={placeholder_text[query.filterType]}
            className={clsx(
              "outline-none appearance-none",
              "flex w-full text-base caret-white bg-neutral-800 pr-2 rounded-tr-lg rounded-br-lg",
              "placeholder:text-neutral-600"
            )}
            value={inputFilterValue}
            onChange={(e) => {
              setInputFilterValue(e.target.value);
              debouncedUpdateUrl(e.target.value);
            }}
            onBlur={unfocusItemLinks}
            onKeyDown={arrowKeyNav}
          />
        </div>

        <div className="relative w-full z-10">
          <div className="absolute w-full flex gap-2">
            <FilterMenu
              value={query.filterType}
              onChange={updateFilterType}
              list={filterValues}
            />
            <SortMenu />
          </div>
        </div>
      </div>
    );
  }
);

export const placeholder_text: Record<FilterType, string> = {
  name: "tateru, saku, raiber, rhoulder...",
  types: "fire, water, wind, mental, digital...",
  traits: "botanist, furor, hover, immunity...",
  techniques: "scratch, block, heat up, kick...",
  number: "1 - 164",
};
