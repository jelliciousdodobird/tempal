import { Menu, Popover } from "@headlessui/react";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  SearchQuery,
  SortKey,
  SortOrder,
  SortType,
} from "../SpecieList/SpecieList.types";
import {
  getUpdatedQueryUrl,
  sortItems,
  sortOrderDescription,
} from "../SpecieList/SpecieList.utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import { createElement } from "react";

type SortMenuProps = {};

export const SortMenu = ({}: SortMenuProps) => {
  const { query, updateQueryUrl } = useUrlQuery();

  const { sortType, sortOrder } = query;

  const props = {
    selectedSortType: sortType,
    selectedSortOrder: sortOrder,
  };

  const sortOrderDesc = sortOrderDescription[sortOrder];

  return (
    <Popover className="flex flex-col relative w-full bg-neutral-800 rounded-md">
      <Popover.Button className="flex justify-between items-center gap-4 min-h-[2.5rem] text-sm w-full px-3">
        <span className="grid place-items-center text-base font-bold uppercase">
          sort by
        </span>
        <span className="text-sm capitalize">
          {sortType}
          <span
            className={clsx(
              "normal-case",
              sortOrder === "asc" ? "text-red-500" : "text-green-500"
            )}
          >{` (${sortOrderDesc.desc})`}</span>
        </span>
      </Popover.Button>

      <div className="relative h-min">
        <Popover.Panel
          as="ul"
          className={clsx(
            "absolute z-10 w-full max-h-[15rem] mt-4",
            "overflow-y-auto overflow-x-hidden custom-scrollbar-tiny",
            "bg-neutral-800"
          )}
        >
          <li className="">
            <span className="">Keys</span>
            <ul>
              <SortItem {...props} sortKey={sortItems["relevance"]} />
              <SortItem {...props} sortKey={sortItems["name"]} />
              <SortItem {...props} sortKey={sortItems["number"]} />
            </ul>
          </li>
          <li className="">
            <span className="">Base Stats</span>
            <ul>
              <SortItem {...props} sortKey={sortItems["base HP"]} />
              <SortItem {...props} sortKey={sortItems["base stamina"]} />
              <SortItem {...props} sortKey={sortItems["base speed"]} />
              <SortItem {...props} sortKey={sortItems["base attack"]} />
              <SortItem {...props} sortKey={sortItems["base defense"]} />
              <SortItem {...props} sortKey={sortItems["base sp. attack"]} />
              <SortItem {...props} sortKey={sortItems["base sp. defense"]} />
            </ul>
          </li>
          <li className="">
            <span className="">Training Values</span>
            <ul>
              <SortItem {...props} sortKey={sortItems["HP TVs"]} />
              <SortItem {...props} sortKey={sortItems["stamina TVs"]} />
              <SortItem {...props} sortKey={sortItems["speed TVs"]} />
              <SortItem {...props} sortKey={sortItems["attack TVs"]} />
              <SortItem {...props} sortKey={sortItems["defense TVs"]} />
              <SortItem {...props} sortKey={sortItems["sp. attack TVs"]} />
              <SortItem {...props} sortKey={sortItems["sp. defense TVs"]} />
            </ul>
          </li>
        </Popover.Panel>
      </div>
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
  };

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full focus:bg-neutral-500 hover:bg-neutral-500 h-10 px-8"
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
    </li>
  );
};
