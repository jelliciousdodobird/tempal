import { IconArrowUp, IconArrowDown } from "@tabler/icons";
import { Dispatch, SetStateAction } from "react";
// import { SearchQuery, SortKey, sortItems, SortOrder } from "./index.page";
import { API_TemData, SearchQuery } from "./index.page";
import {
  groupItem,
  groupKey,
  sortBox,
  sortIconBox,
  sortItem,
  sortItemLabel,
} from "./tems.css";

export type SortType =
  | "relevance"
  | "number"
  | "name"
  | "base HP"
  | "base stamina"
  | "base speed"
  | "base attack"
  | "base defense"
  | "base sp. attack"
  | "base sp. defense"
  | "HP TVs"
  | "stamina TVs"
  | "speed TVs"
  | "attack TVs"
  | "defense TVs"
  | "sp. attack TVs"
  | "sp. defense TVs";

export type SortOrder = "asc" | "des";

export interface SortKey {
  value: SortType;
  label: string;
  accessor: (item: API_TemData) => string | number;
}

export const getComparator = (sortKey: SortKey, sortOrder: SortOrder) => {
  return (a: API_TemData, b: API_TemData) => {
    const x = sortKey.accessor(a);
    const y = sortKey.accessor(b);
    const order = sortOrder === "asc" ? 1 : -1;

    if (typeof x === "number" && typeof y === "number") return order * (x - y);
    else if (typeof x === "string" && typeof y === "string")
      return order * x.localeCompare(y);
    else return 0;
  };
};

const iconProps = {
  pointerEvents: "none",
  size: 18,
};

interface SortItemProps {
  value: SortKey;

  selectedItem: SortKey;
  // setSelectedItem: Dispatch<SetStateAction<SelectItem>>;

  sortOrder: SortOrder;
  // setSortOrder: Dispatch<SetStateAction<SortOrder>>;

  setQuery: Dispatch<SetStateAction<SearchQuery>>;
}

export const SortItem = ({
  value,
  selectedItem,
  // setSelectedItem,
  sortOrder,

  setQuery,
}: // setSortOrder,
SortItemProps) => {
  const itemSelected = selectedItem.value === value.value;

  return (
    <li
      className={sortItem}
      onClick={() => {
        if (itemSelected)
          setQuery((v) => ({
            ...v,
            sortOrder: v.sortOrder === "asc" ? "des" : "asc",
          }));
        else setQuery((v) => ({ ...v, sortOrder: "des", sortKey: value }));
      }}
    >
      <span className={sortItemLabel} data-selected={itemSelected}>
        {value.label}
      </span>
      <span className={sortIconBox}>
        {itemSelected && (
          <>
            {sortOrder === "asc" ? (
              <IconArrowUp {...iconProps} />
            ) : (
              <IconArrowDown {...iconProps} />
            )}
          </>
        )}
      </span>
    </li>
  );
};

interface SortMenuProps {
  sortKey: SortKey;
  sortOrder: SortOrder;
  setQuery: Dispatch<SetStateAction<SearchQuery>>;
  className?: string;
}

export const SortMenu = ({
  sortKey,
  sortOrder,
  setQuery,
  className,
}: SortMenuProps) => {
  return (
    <ul className={sortBox + className}>
      <li className={groupItem}>
        <span className={groupKey}>Keys</span>
        <ul>
          <SortItem
            value={sortItems["relevance"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["name"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["number"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
        </ul>
      </li>
      <li className={groupItem}>
        <span className={groupKey}>Base Stats</span>
        <ul>
          <SortItem
            value={sortItems["base HP"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base stamina"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base speed"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base attack"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base defense"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base sp. attack"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["base sp. defense"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
        </ul>
      </li>
      <li className={groupItem}>
        <span className={groupKey}>Training Values</span>
        <ul>
          <SortItem
            value={sortItems["HP TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["stamina TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["speed TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["attack TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["defense TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["sp. attack TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
          <SortItem
            value={sortItems["sp. defense TVs"]}
            selectedItem={sortKey}
            sortOrder={sortOrder}
            setQuery={setQuery}
          />
        </ul>
      </li>
    </ul>
  );
};

export const sortOrderDescription: Record<
  SortOrder,
  { word: string; desc: string }
> = {
  asc: { word: "ascending", desc: "low to high" },
  des: { word: "descending", desc: "high to low" },
};

export const sortItems: Record<SortType, SortKey> = {
  relevance: {
    value: "relevance",
    label: "Relevance",
    accessor: (item: API_TemData) => 0,
  },
  number: {
    value: "number",
    label: "Number",
    accessor: (item: API_TemData) => item.number,
  },
  name: {
    value: "name",
    label: "Name",
    accessor: (item: API_TemData) => item.name,
  },
  "base HP": {
    value: "base HP",
    label: "HP",
    accessor: (item: API_TemData) => item.stats.hp,
  },
  "base stamina": {
    value: "base stamina",
    label: "Stamina",
    accessor: (item: API_TemData) => item.stats.sta,
  },
  "base speed": {
    value: "base speed",
    label: "Speed",
    accessor: (item: API_TemData) => item.stats.spd,
  },
  "base attack": {
    value: "base attack",
    label: "Attack",
    accessor: (item: API_TemData) => item.stats.atk,
  },
  "base defense": {
    value: "base defense",
    label: "Defense",
    accessor: (item: API_TemData) => item.stats.def,
  },
  "base sp. attack": {
    value: "base sp. attack",
    label: "Sp. Atk",
    accessor: (item: API_TemData) => item.stats.spatk,
  },
  "base sp. defense": {
    value: "base sp. defense",
    label: "Sp. Def",
    accessor: (item: API_TemData) => item.stats.spdef,
  },
  "HP TVs": {
    value: "HP TVs",
    label: "HP",
    accessor: (item: API_TemData) => item.tvYields.hp,
  },
  "stamina TVs": {
    value: "stamina TVs",
    label: "Stamina",
    accessor: (item: API_TemData) => item.tvYields.sta,
  },
  "speed TVs": {
    value: "speed TVs",
    label: "Speed",
    accessor: (item: API_TemData) => item.tvYields.spd,
  },
  "attack TVs": {
    value: "attack TVs",
    label: "Attack",
    accessor: (item: API_TemData) => item.tvYields.atk,
  },
  "defense TVs": {
    value: "defense TVs",
    label: "Defense",
    accessor: (item: API_TemData) => item.tvYields.def,
  },
  "sp. attack TVs": {
    value: "sp. attack TVs",
    label: "Sp. Atk",
    accessor: (item: API_TemData) => item.tvYields.spatk,
  },
  "sp. defense TVs": {
    value: "sp. defense TVs",
    label: "Sp. Def",
    accessor: (item: API_TemData) => item.tvYields.spdef,
  },
};
