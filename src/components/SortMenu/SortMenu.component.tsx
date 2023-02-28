import clsx from "clsx";
import { Menu, Switch } from "@headlessui/react";
import { Popover } from "@headlessui/react";
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
    <Popover className="w-full">
      <Popover.Button
        className={clsx(
          "flex items-center gap-2 rounded-lg h-8 px-2 flex-1 font-bold text-xs",
          "outline-none appearance-none focus-visible:ring-1 ring-white ring-inset",
          "w-full",
          sortOrder === "asc"
            ? "text-red-400 bg-red-800/50"
            : "text-green-500 bg-green-800/50"
        )}
      >
        <IconSortAscending2 size={20} />
        <div className="flex-1 flex justify-between">
          <span className="uppercase">{SORT_LABELS[sortType]}</span>
          <span className="">{`(${sortOrderDesc.desc})`}</span>
        </div>
      </Popover.Button>

      <Popover.Panel
        as="ul"
        className={clsx(
          "outline-none appearance-none",
          "absolute left-0 top-0 w-full max-h-[15rem]zz rounded-md",
          "overflow-y-auto overflow-x-hidden custom-scrollbar-tiny",
          "backdrop-blur-md shadow-lg bg-neutral-800/90",
          "flex flex-col gap-2 pb-2 pt-6zz mt-2zz"
        )}
      >
        <li className="w-full h-6 flex justify-end p-2 mb-4">
          <div className="w-full h-8 rounded-md flex items-center p-3 bg-neutral-700/30zz text-neutral-200 text-lg uppercasezz font-extrabold tracking-wide">
            <IconSortAscending2 size={20} />
            <span className="pl-2">Sort Options & Order</span>
          </div>
        </li>
        <li className="flex flex-col gap-2 px-3">
          <span className="absolute ml-2 flex justify-center items-center w-auto text-sm text-neutral-800/80zz text-neutral-300 font-extrabold rounded-lg px-2 py-1">
            Keys
          </span>
          <ul className="flex flex-row flex-wrap gap-2 border border-neutral-700/50 rounded-lg px-2 pt-[1.1rem] pb-2 mt-[1rem]">
            <SortItem {...props} sortKey={SORT_TYPE_MAP["relevance"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["name"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["number"]} />
          </ul>
        </li>
        <li className="flex flex-col gap-2 px-3">
          <span className="absolute left-[10%]zz ml-2 flex justify-center items-center w-auto text-sm text-neutral-300 font-extrabold rounded-lg px-2 py-1">
            Base Stats
          </span>
          <ul className="flex flex-row flex-wrap gap-2 border border-neutral-700/50 rounded-lg px-2 pt-[1.1rem] pb-2 mt-[1rem]">
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base HP"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base stamina"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base speed"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base attack"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base defense"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base sp. attack"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["base sp. defense"]} />
          </ul>
        </li>
        <li className="flex flex-col gap-2 px-3">
          <span className="absolute left-[10%]zz ml-2 flex justify-center items-center w-auto text-sm text-neutral-300 font-extrabold rounded-lg px-2 py-1">
            Training Values
          </span>
          <ul className="flex flex-row flex-wrap gap-2 border border-neutral-700/50 rounded-lg px-2 pt-[1.1rem] pb-2 mt-[1rem]">
            <SortItem {...props} sortKey={SORT_TYPE_MAP["HP TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["stamina TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["speed TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["attack TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["defense TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["sp. attack TVs"]} />
            <SortItem {...props} sortKey={SORT_TYPE_MAP["sp. defense TVs"]} />
          </ul>
        </li>
      </Popover.Panel>
    </Popover>
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
    console.log(selectedSortOrder);
  };

  return (
    <Popover.Button as="li" className="w-max">
      <button
        type="button"
        className={clsx(
          "flex flex-row items-center px-3 py-1",
          "rounded-md text-xs",
          "hover:scale-110",
          itemSelected
            ? selectedSortOrder === "asc"
              ? "text-red-400 bg-red-800/50 font-bold"
              : "text-green-500 bg-green-800/50 font-bold"
            : "bg-neutral-700/30 text-neutral-300/70 "
        )}
        onClick={toggleItem}
      >
        <span className="" data-selected={itemSelected}>
          {sortKey.shortLabel}
        </span>
        <span className={itemSelected ? "pl-2" : ""}>
          {itemSelected && (
            <IconArrowUp
              className={clsx(
                "transition-[transform]",
                selectedSortOrder === "asc" ? "rotate-0" : "rotate-180",
                "animate-pulse"
              )}
              size={16}
            />
          )}
        </span>
      </button>
    </Popover.Button>
  );
};

export const SORT_LABELS: Record<SortType, string> = {
  relevance: "Relevance",
  number: "Num",
  name: "Name",
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
