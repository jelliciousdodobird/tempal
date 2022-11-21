import axios from "axios";
import Fuse from "fuse.js";
import type { NextPage, GetStaticProps } from "next";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TemCard } from "../../components/TemCard/TemCard/TemCard.component";

import Image from "next/future/image";

import SvgBG from "../../../public/assets/background/stuff.svg";

import { TemType } from "../../utils/types";
import {
  header,
  headerBackground,
  listContainer,
  temsPageBox,
  stickyBox,
  sortButton,
  resultsOverview,
  bolden,
  redBolden,
  landingImage,
  pageContent,
  searchButtonText,
  iconBox,
  bannerBgImage,
  H1,
  sortBox,
  groupKey,
  sortItem,
  sortIconBox,
  sortItemLabel,
  groupItem,
  sortingDesc,
} from "./tems.css";
import {
  IconAdjustmentsAlt,
  IconAdjustmentsHorizontal,
  IconArrowDown,
  IconArrowUp,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons";
import { SearchInput } from "../../components/SearchInput/SearchInput.component";
import { useDebounce } from "../../hooks/useDebounce";
import { usePopup } from "../../hooks/usePopup";
import { italic } from "../../styles/utility-styles.css";

export interface Stats {
  atk: number;
  def: number;
  hp: number;
  spatk: number;
  spd: number;
  spdef: number;
  sta: number;
}

export interface StatsWithTotal extends Stats {
  total: number;
}

type API_TemData = {
  name: string;
  number: number;
  types: [TemType, TemType | null];
  traits: [string, string];
  stats: StatsWithTotal;
  tvYields: Stats;

  wikiRenderStaticUrl: string;
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
};

type TemProps = {
  tems: API_TemData[];
};

export const getStaticProps: GetStaticProps<TemProps> = async () => {
  const res = await axios.get("https://temtem-api.mael.tech/api/temtems", {
    params: {
      fields:
        "name,number,types,traits,stats,tvYields,wikiRenderStaticUrl,wikiRenderAnimatedUrl,wikiRenderStaticLumaUrl,wikiRenderAnimatedLumaUrl",
      weaknesses: true,
    },
  });
  const data = await res.data;
  return {
    props: {
      tems: data.map((d: API_TemData) => ({
        ...d,
        types: [
          d.types[0].toLowerCase(),
          d.types[1] ? d.types[1].toLowerCase() : null,
        ] as [TemType, TemType | null],
      })),
    }, // will be passed to the page component as props
  };
};

const STARTING_LIMIT = 10;

const filterKeys = ["name", "number", "types", "traits"] as const;
const keyData = filterKeys.map((key) => ({ name: key }));
export type FilterKey = typeof filterKeys[number] | "all";

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

export interface SelectItem {
  value: SortType;
  label: string;
  accessor: (item: API_TemData) => string | number;
}

export type SortOrder = "asc" | "des";

const sortItems: Record<SortType, SelectItem> = {
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
    label: "Sp. Attack",
    accessor: (item: API_TemData) => item.stats.spatk,
  },
  "base sp. defense": {
    value: "base sp. defense",
    label: "Sp. Defense",
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
    label: "Sp. Attack",
    accessor: (item: API_TemData) => item.tvYields.spatk,
  },
  "sp. defense TVs": {
    value: "sp. defense TVs",
    label: "Sp. Defense",
    accessor: (item: API_TemData) => item.tvYields.spdef,
  },
};

const getCompareFunction = (sortKey: SelectItem, sortOrder: SortOrder) => {
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

const sortOrderDescription: Record<SortOrder, { word: string; desc: string }> =
  {
    asc: { word: "ascending", desc: "lowest to highest" },
    des: { word: "descending", desc: "highest to lowest" },
  };

const Tems: NextPage<TemProps> = ({ tems }) => {
  const searcher = useMemo(
    () =>
      new Fuse(tems, {
        keys: keyData,
        useExtendedSearch: true,
        includeScore: true,
        shouldSort: true,
        threshold: 0.34,
      }),
    [tems]
  );

  const search = useCallback(
    (key: FilterKey, query: string) => {
      const hasKey = key !== "all";
      const basicQuery = hasKey ? { [key]: query } : query;

      const andTokens = query.split("&").map((v) => v.trim());
      const orTokens = query.split("|").map((v) => v.trim());

      let finalQuery: string | Fuse.Expression = basicQuery;
      if (andTokens.length > 1 && orTokens.length > 1) {
        finalQuery = { "": "invalid key" };
      } else if (hasKey && andTokens.length > 1) {
        finalQuery = {
          $and: andTokens.map((v) => ({ [key]: v })),
        };
      } else if (hasKey && orTokens.length > 1) {
        finalQuery = {
          $or: andTokens.map((v) => ({ [key]: v })),
        };
      }

      const searchResults = searcher.search(finalQuery);
      const results = searchResults ? searchResults.map((v) => v.item) : tems;
      const data = query === "" ? tems : results;

      if (data !== tems) setRange(STARTING_LIMIT); // reset the range
      return data;
    },

    [searcher, tems]
  );

  const numOfItems = useRef(tems.length);
  const [range, setRange] = useState(STARTING_LIMIT);
  const [searchTerm, setSearchTerm] = useState("");
  const [keyFilter, setKeyFilter] = useState<FilterKey>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("des");
  const [sortBy, setSortBy] = useState<SelectItem>(sortItems["relevance"]);

  const sortDesc = sortOrderDescription[sortOrder];

  const compare = useCallback(getCompareFunction(sortBy, sortOrder), [
    sortBy,
    sortOrder,
  ]);

  const {
    opened: sortOpened,
    setOpened: setSortOpened,
    safeMark: sortSafeMark,
    togglePopup: toggleSortOpened,
  } = usePopup();

  const debouncedTerm = useDebounce(searchTerm, 750);
  const memoResults = useMemo(
    () => search(keyFilter, debouncedTerm),
    [search, keyFilter, debouncedTerm]
  );

  const results = useMemo(
    () => [...memoResults].sort(compare),
    [memoResults, compare]
  );
  const renderList = results.slice(0, range);

  useEffect(() => {
    const scrollContainer = document.querySelector("body");
    if (!scrollContainer) return;

    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const t = Math.abs(scrollHeight - clientHeight - scrollTop);
      if (t < 5000) setRange((v) => Math.min(v + 5, numOfItems.current));
    };

    scrollContainer.addEventListener("scroll", handler);

    return () => {
      scrollContainer.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    if (results.length === numOfItems.current) return;

    document
      .querySelector("#temtem-list")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  return (
    <div className={temsPageBox}>
      <div className={pageContent}>
        <div className={header}>
          <div className={headerBackground}>
            {/* <Image
              // className={landingImage}
              // className={bannerBgImage}
              src="https://temtem.wiki.gg/images/8/8d/LumaCycrox_full_render.png"
              alt="Banner pic of tateru"
              width={50}
              height={50}
              quality={100}
              priority={true}
            /> */}
            {/* <SvgBG /> */}
          </div>
          <h1 className={H1}>Tem List</h1>
          <h2>
            A showcase of all available temtems! Check out their luma variant
            and animations, filter, and sort to find the perfect temtem for your
            team.
          </h2>

          {/* <Image
            className={landingImage}
            src="https://temtem.wiki.gg/images/0/0e/Tateru_full_render.png"
            alt="Banner pic of tateru"
            width={500}
            height={500}
            quality={100}
            priority={true}
          /> */}
        </div>

        <div className={stickyBox}>
          {sortOpened && (
            <ul className={sortBox + sortSafeMark}>
              <li className={groupItem}>
                <span className={groupKey}>Keys</span>
                <ul>
                  <SortItem
                    value={sortItems["relevance"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["name"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["number"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </ul>
              </li>
              <li className={groupItem}>
                <span className={groupKey}>Base Stats</span>
                <ul>
                  <SortItem
                    value={sortItems["base HP"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base stamina"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base speed"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base attack"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base defense"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base sp. attack"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["base sp. defense"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </ul>
              </li>
              <li className={groupItem}>
                <span className={groupKey}>Training Values</span>
                <ul>
                  <SortItem
                    value={sortItems["HP TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["stamina TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["speed TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["attack TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["defense TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["sp. attack TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <SortItem
                    value={sortItems["sp. defense TVs"]}
                    selectedItem={sortBy}
                    setSelectedItem={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </ul>
              </li>
            </ul>
          )}
          <SearchInput
            value={searchTerm}
            setValue={setSearchTerm}
            filter={keyFilter}
            setFilter={setKeyFilter}
          />
          <button
            className={sortButton + sortSafeMark}
            type="button"
            onClick={toggleSortOpened}
          >
            <span className={iconBox}>
              <IconSortAscending2 size={24} pointerEvents="none" />
            </span>
            <span className={searchButtonText}>sort</span>
          </button>
        </div>

        <div className={resultsOverview} id="temtem-list">
          {renderList.length === 0 && (
            <>
              <span className={redBolden}>0</span> temtems found. 😵
            </>
          )}
          {renderList.length > 0 && (
            <>
              <p>
                <span className={bolden}>{results.length}</span> temtem(s)
                found.
              </p>
              <p>
                Sorted by <span className={sortingDesc}>{sortBy.value}</span> in{" "}
                {sortDesc.word}
                <span className={italic}> ({sortDesc.desc})</span> order.
              </p>
            </>
          )}
        </div>

        <ul className={listContainer}>
          {renderList.map((v) => {
            const id = `${v.name}-${v.types[0]}`;
            return (
              <TemCard
                id={id}
                key={id}
                number={v.number}
                name={v.name}
                types={v.types}
                traits={v.traits}
                stats={v.stats}
                tvYields={v.tvYields}
                imgStaticUrl={v.wikiRenderStaticUrl}
                imgAnimatedUrl={v.wikiRenderAnimatedUrl}
                imgStaticLumaUrl={v.wikiRenderStaticLumaUrl}
                imgAnimatedLumaUrl={v.wikiRenderAnimatedLumaUrl}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Tems;

interface SortItemProps {
  value: SelectItem;

  selectedItem: SelectItem;
  setSelectedItem: Dispatch<SetStateAction<SelectItem>>;

  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
}

const iconProps = {
  pointerEvents: "none",
  size: 18,
};

const SortItem = ({
  value,
  selectedItem,
  setSelectedItem,
  sortOrder,
  setSortOrder,
}: SortItemProps) => {
  const itemSelected = selectedItem.value === value.value;
  return (
    <li
      className={sortItem}
      onClick={() => {
        if (itemSelected) setSortOrder((v) => (v === "asc" ? "des" : "asc"));
        else {
          setSortOrder("des");
          setSelectedItem(value);
        }
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
