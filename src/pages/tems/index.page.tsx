import axios from "axios";
import Fuse from "fuse.js";
import type { NextPage, GetStaticProps } from "next";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TemCard } from "../../components/TemCard/TemCard/TemCard.component";

import debounce from "lodash.debounce";
import Image from "next/future/image";

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
} from "./tems.css";
import {
  IconAdjustmentsAlt,
  IconAdjustmentsHorizontal,
  IconSortAscending2,
} from "@tabler/icons";
import { SearchInput } from "../../components/SearchInput/SearchInput.component";

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

type CustomKey = Fuse.FuseOptionKeyObject<API_TemData> & {
  alias?: string[];
};

const customKeyData: CustomKey[] = [
  { name: "name" },
  { name: "number" },
  { name: "types", alias: ["type"] },
  { name: "traits", alias: ["trait"] },
];

const resolveKey = (key: string) => {
  for (const keyObj of customKeyData) {
    if (keyObj.alias)
      for (const alias of keyObj.alias) {
        if (key === alias) return keyObj.name as string;
      }
  }
  return key;
};

const Tems: NextPage<TemProps> = ({ tems }) => {
  const searcher = useMemo(
    () =>
      new Fuse(tems, {
        keys: customKeyData,
        useExtendedSearch: true,
        includeScore: true,
        shouldSort: true,
        threshold: 0.34,
      }),
    [tems]
  );

  const [range, setRange] = useState(STARTING_LIMIT);
  const [results, setResults] = useState<API_TemData[]>(tems);
  const renderList = results.slice(0, range);
  const numOfItems = useRef(tems.length);
  const [searchTerm, setSearchTerm] = useState("");

  const search = useCallback(
    debounce((query: string) => {
      setResults((list) => {
        const tokens = query.toLowerCase().split(":");

        const hasKey = tokens.length > 1;
        const key = hasKey ? resolveKey(tokens[0]) : "";
        const basicQuery = hasKey ? { [key]: tokens[1] } : tokens[0];

        const queryValueStr = hasKey ? tokens[1] : tokens[0];
        const andTokens = queryValueStr.split("&").map((v) => v.trim());
        const orTokens = queryValueStr.split("|").map((v) => v.trim());

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
        const results = searchResults ? searchResults.map((v) => v.item) : list;
        const data = queryValueStr === "" ? tems : results;

        if (data !== list) setRange(STARTING_LIMIT); // reset the range
        return data;
      });
    }, 750),
    [searcher, tems]
  );

  useEffect(() => {
    const scrollContainer = document.querySelector("body");
    if (!scrollContainer) return;

    const handler = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const t = Math.abs(scrollHeight - clientHeight - scrollTop);
      if (t < 5000) {
        setRange((v) => Math.min(v + 5, numOfItems.current));
      }
    };

    scrollContainer.addEventListener("scroll", handler);

    return () => {
      scrollContainer.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    search(searchTerm);
  }, [search, searchTerm]);

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
          <div className={headerBackground}></div>
          TEMTEM
          <Image
            className={landingImage}
            src="https://temtem.wiki.gg/images/b/b0/Tateru_idle_animation.gif"
            alt="Banner pic of tateru"
            width={500}
            height={500}
            quality={100}
            priority={true}
          />
        </div>

        <div className={stickyBox}>
          <SearchInput value={searchTerm} setValue={setSearchTerm} />
          <button className={sortButton} type="button">
            <span className={iconBox}>
              <IconAdjustmentsHorizontal
                // shapeRendering="crispEdges"
                size={24}
                pointerEvents="none"
                strokeWidth={2}
              />
            </span>
            <span className={searchButtonText}>filter</span>
          </button>
          <button className={sortButton} type="button">
            <span className={iconBox}>
              <IconSortAscending2
                // shapeRendering="crispEdges"
                size={24}
                pointerEvents="none"
                // strokeWidth={2}
              />
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
              <span className={bolden}>{results.length}</span> temtem(s) found.
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
