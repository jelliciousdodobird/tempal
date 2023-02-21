import clsx from "clsx";
import { Menu, Switch } from "@headlessui/react";
import {
  IconArrowsSort,
  IconArrowUp,
  IconSortAscending2,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import { ReactNode } from "react";
import {
  FilterType,
  SearchQuery,
  SortKey,
  SortOrder,
  SortType,
} from "../SpecieList/SpecieList.types";
import {
  getUpdatedQueryUrl,
  SORT_TYPE_MAP,
  sortOrderDescription,
} from "../SpecieList/SpecieList.utils";

type SortMenuProps = {};

export const SortMenu = ({}: SortMenuProps) => {
  const { query } = useUrlQuery();
  const { sortType, sortOrder } = query;
  const sortOrderDesc = sortOrderDescription[sortOrder];

  const props = {
    selectedSortType: sortType,
    selectedSortOrder: sortOrder,
  };

  return (
    <Menu>
      <Menu.Button
        className={clsx(
          "flex items-center gap-2 rounded-lg h-8 px-2 flex-1 font-bold text-xs",
          "outline-none appearance-none focus-visible:ring-1 ring-white ring-inset",
          sortOrder === "asc"
            ? "text-red-400 bg-red-800/50"
            : "text-green-500 bg-green-800/50"
        )}
      >
        <IconSortAscending2 size={20} />
        <span className="">{SORT_LABELS[sortType]}</span>
        <span className="">{`(${sortOrderDesc.desc})`}</span>
      </Menu.Button>

      <Menu.Items
        as="ul"
        className={clsx(
          "outline-none appearance-none",
          "absolute z-10 w-full max-h-[15rem] rounded-lg",
          "overflow-y-auto overflow-x-hidden custom-scrollbar-tiny",
          "bg-black/50 backdrop-blur-md"
        )}
      >
        <li className="sticky top-0">
          How would you like to sort the results?
        </li>
        <li className="">
          <span className="">Keys</span>
          <ul>
            <SortItem {...props} sortKey={SORT_TYPE_MAP["relevance"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["name"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["number"]} />
          </ul>
        </li>
        <li className="">
          <span className="">Base Stats</span>
          <ul>
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base HP"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base stamina"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base speed"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base attack"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base defense"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base sp. attack"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base sp. defense"]} />
          </ul>
        </li>
        <li className="">
          <span className="">Training Values</span>
          <ul>
            <SortItem {...props} sortKey={SORT_TYPE_MAP["HP TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["stamina TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["speed TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["attack TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["defense TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["sp. attack TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["sp. defense TVs"]} />
          </ul>
        </li>
      </Menu.Items>
    </Menu>
  );
};

type SortItemProps = {
  sortKey: SortKey;
  selectedSortType: SortType;
  selectedSortOrder: SortOrder;
};

export const SortItem = ({
  sortKey,
  selectedSortType,
  selectedSortOrder,
}: SortItemProps) => {
  const { label, value } = sortKey;
  const itemSelected = sortKey.value === selectedSortType;

  const router = useRouter();

  const setQuery = (query: Partial<SearchQuery>) =>
    router.replace(getUpdatedQueryUrl(query));

  const toggleItem = () => {
    if (itemSelected)
      setQuery({
        sortOrder: selectedSortOrder === "asc" ? "des" : "asc",
      });
    else setQuery({ sortOrder: "des", sortType: value });
  };

  return (
    <li>
      <Menu.Item>
        {({ active }) => (
          <button
            type="button"
            className={clsx(
              "flex items-center w-full h-10 px-8",
              active ? "bg-neutral-900/50" : ""
            )}
            onClick={toggleItem}
          >
            <span className="" data-selected={itemSelected}>
              {label}
            </span>
            <span className="">
              {itemSelected && (
                <IconArrowUp
                  className={clsx(
                    "transition-[transform]",
                    selectedSortOrder === "asc" ? "rotate-0" : "rotate-180"
                  )}
                />
              )}
            </span>
          </button>
        )}
      </Menu.Item>
    </li>
  );
};

export const SORT_LABELS: Record<SortType, string> = {
  relevance: "RELEVANCE",
  number: "NUMBER",
  name: "NAME",
  "base HP": "HP",
  "base stamina": "STA",
  "base speed": "SPD",
  "base attack": "ATK",
  "base defense": "DEF",
  "base sp. attack": "SP ATK",
  "base sp. defense": "SP DEF",
  "HP TVs": "HP TVs",
  "stamina TVs": "STA TVs",
  "speed TVs": "SPD TVs",
  "attack TVs": "ATK TVs",
  "defense TVs": "DEF TVs",
  "sp. attack TVs": "SP ATK TVs",
  "sp. defense TVs": "SP DEF TVs",
};

export const FilterValue = ({ children }: { children: string }) => (
  <span className="text-yellow-400 bg-yellow-900/50 rounded px-1 font-bold">
    {children}
  </span>
);

export const FilterTypeSpan = ({ children }: { children: ReactNode }) => (
  <span className="font-bold text-white">{children}</span>
);

export const fns: Record<FilterType | "", (value: string) => ReactNode> = {
  name: (filterValue) => (
    <>
      {"Showing tems whose "}
      <FilterTypeSpan>{"name"}</FilterTypeSpan>
      {" is "}
      <FilterValue>{filterValue}</FilterValue>
    </>
  ),
  number: (filterValue) => (
    <>
      {"Showing tems with the tempedia "}
      <FilterTypeSpan>{"number "}</FilterTypeSpan>
      <FilterValue>{filterValue}</FilterValue>
    </>
  ),
  techniques: (filterValue) => (
    <>
      {"Showing tems that know the "}
      <FilterTypeSpan>{"technique "}</FilterTypeSpan>
      <FilterValue>{filterValue}</FilterValue>
    </>
  ),
  traits: (filterValue) => (
    <>
      {"Showing tems that have the "}
      <FilterTypeSpan>{"trait "}</FilterTypeSpan>
      <FilterValue>{filterValue}</FilterValue>
    </>
  ),
  types: (filterValue) => (
    <>
      {"Showing tems that are "}
      <FilterValue>{filterValue}</FilterValue>
      <FilterTypeSpan>{" types"}</FilterTypeSpan>
    </>
  ),
  "": (filterValue) => (
    <>
      {"Showing "}
      <FilterValue>{"all"}</FilterValue>
      {" temtems"}
    </>
  ),
};

/* <div className="text-neutral-500 text-sm rounded-lg p-4 border border-neutral-500/20">
        {showQuerySummary ? (
          <>
            {fns[query.filterValue === "" ? "" : query.filterType](
              query.filterValue
            )}
            {" sorted by "}
            <Menu.Button
              as="span"
              tabIndex={0}
              className="cursor-pointer outline-none appearance-none hover:underline focus-visible:ring-1 focus-visible:underline font-bold rounded text-white ring-white"
            >
              {sortType}
            </Menu.Button>
            {" from "}
            <Switch
              as="span"
              checked={checked}
              onChange={toggle}
              className={clsx(
                "cursor-pointer outline-none appearance-none hover:underline focus-visible:ring-1 focus-visible:underline font-bold rounded px-1 ring-white",
                checked
                  ? "text-red-500 bg-red-900/50"
                  : "text-green-500 bg-green-900/50"
              )}
            >
              {sortOrderDesc.desc}
            </Switch>
          </>
        ) : (
          <span>No results found.</span>
        )}
      </div> */
