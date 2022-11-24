import axios from "axios";
import Fuse from "fuse.js";
import type { NextPage, GetStaticProps } from "next";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  pageContent,
  searchButtonText,
  iconBox,
  H1,
  sortingDesc,
  subTitle,
  headerContent,
} from "./tems.css";
import { IconSortAscending2 } from "@tabler/icons";
import { SearchInput } from "../../components/SearchInput/SearchInput.component";
import { useDebounce } from "../../hooks/useDebounce";
import { usePopup } from "../../hooks/usePopup";
import { italic } from "../../styles/utility-styles.css";
import useResizeObserver from "use-resize-observer";
import { theme } from "../../styles/themes.css";
import {
  getComparator,
  sortItems,
  SortKey,
  SortMenu,
  SortOrder,
  sortOrderDescription,
} from "./SortMenu.component";
import { TemDexPageBanner } from "../../components/TemDexPageBanner/TemDexPageBanner.component";

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

export interface API_TemData {
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
}

export interface TemDexPageProps {
  tems: API_TemData[];
}

export interface SearchQuery {
  filterKey: FilterKey;
  sortKey: SortKey;
  sortOrder: SortOrder;
  value: string;
}

export type FuseKey = "name" | "number" | "types" | "traits"; // add more keys here to support searching data in that key
export type FilterKey = FuseKey | "all";

export const getStaticProps: GetStaticProps<TemDexPageProps> = async () => {
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

const fuseKeysConfig: Record<FuseKey, Fuse.FuseOptionKey<API_TemData>> = {
  name: { name: "name" },
  number: { name: "number" },
  types: { name: "types" },
  traits: { name: "traits" },
};

const fuseKeyData = Object.values(fuseKeysConfig).map((v) => v);

// navbarHeight + headerContentHeight + searchBoxHeight + bottomSpacing
// this is the best guess height for the banner:
const default_height = `calc(${theme.mainNav.maxHeight} + 30vh + 4rem + 8rem)`;

const default_query: SearchQuery = {
  filterKey: "all",
  sortKey: sortItems["relevance"],
  sortOrder: "des",
  value: "",
};

const TemdexPage: NextPage<TemDexPageProps> = ({ tems }) => {
  const [height, setHeight] = useState(default_height);
  const endOfHeaderRef = useRef<HTMLDivElement>(null);
  const calcHeight = useCallback(() => {
    if (!endOfHeaderRef.current) return;
    const t = endOfHeaderRef.current.getBoundingClientRect().y;
    setHeight(t + "px");
  }, []);

  useResizeObserver({
    ref: endOfHeaderRef,
    onResize: calcHeight,
  });
  // ---------------------------------------------------------------------------
  const {
    opened: sortOpened,
    safeMark: sortSafeMark,
    togglePopup: toggleSortOpened,
  } = usePopup();
  // ---------------------------------------------------------------------------

  const searcher = useMemo(
    () =>
      new Fuse(tems, {
        keys: fuseKeyData,
        useExtendedSearch: true,
        includeScore: true,
        shouldSort: true,
        threshold: 0.2,
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
  const [query, setQuery] = useState<SearchQuery>(default_query);
  const debouncedQuery = useDebounce(query, 750);

  const sortDesc = sortOrderDescription[query.sortOrder];

  const comparator = useCallback(
    () => getComparator(debouncedQuery.sortKey, debouncedQuery.sortOrder),
    [debouncedQuery]
  );

  const resultsSortedByRelevance = useMemo(
    () => search(debouncedQuery.filterKey, debouncedQuery.value),
    [search, debouncedQuery.filterKey, debouncedQuery.value]
  );

  const results = useMemo(
    () => [...resultsSortedByRelevance].sort(comparator()),
    [resultsSortedByRelevance, comparator]
  );
  const renderList = results.slice(0, range);

  // ---------------------------------------------------------------------------

  const tipExampleForAND = () =>
    setQuery((v) => ({
      ...v,
      filterKey: "types",
      value: "water & toxic",
    }));

  const tipExampleForOR = () =>
    setQuery((v) => ({
      ...v,
      filterKey: "name",
      value: "babawa | cycrox | raignet",
    }));

  // ---------------------------------------------------------------------------
  /**
   * Detects when user is scrolled near the bottom of the page to load new items.
   * This detection algorithm is hungry to account for accelerated scrolling on mobile devices.
   * Hungry meaning it detects thinks the user is at the bottom of the page much sooner than
   * the actual bottom of the page.
   */
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

  /**
   * Scrolls to the top of the results when there is a new query.
   */
  useEffect(() => {
    if (results.length === numOfItems.current) return;

    document
      .querySelector("#temtem-list")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  return (
    <div className={temsPageBox}>
      <div className={pageContent}>
        <div className={headerBackground} style={{ height }}>
          <TemDexPageBanner />
        </div>
        <div className={header}>
          <div className={headerContent}>
            <h1 className={H1}>temdex</h1>
            <p className={subTitle}>
              A showcase of all available temtems! Check out their luma variant
              and animations, filter, and sort to find the perfect temtem for
              your team.
            </p>

            <p className={subTitle}>
              TIP: If you select a filter category, you can use boolean
              operations to be more specific with your search.
            </p>

            <p onClick={tipExampleForAND}>
              Find all tems whose type is water AND toxic.
            </p>
            <p onClick={tipExampleForOR}>
              Display a list of tems you want to compare.
            </p>
          </div>
        </div>

        <div className={stickyBox}>
          {sortOpened && (
            <SortMenu
              sortKey={query.sortKey}
              sortOrder={query.sortOrder}
              setQuery={setQuery}
              className={sortSafeMark}
            />
          )}
          <SearchInput
            value={query.value}
            filter={query.filterKey}
            setQuery={setQuery}
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

        <div ref={endOfHeaderRef}></div>

        <div className={resultsOverview} id="temtem-list">
          {renderList.length === 0 && (
            <p>
              <span className={redBolden}>0</span> temtems found. 😵
            </p>
          )}
          {renderList.length > 0 && (
            <>
              <p>
                <span className={bolden}>{results.length}</span> temtem(s) found
              </p>
              <p>
                by{" "}
                <span className={sortingDesc}>
                  {debouncedQuery.sortKey.value}
                </span>
                <span className={italic}> {sortDesc.desc}</span>
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

export default TemdexPage;
