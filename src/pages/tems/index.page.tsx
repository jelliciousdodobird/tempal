import axios from "axios";
import Fuse from "fuse.js";
import type { NextPage, GetStaticProps } from "next";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TemCard } from "../../components/TemCard/TemCard/TemCard.component";

import debounce from "lodash.debounce";

import { TemType } from "../../utils/types";
import {
  header,
  headerBackground,
  headerContent,
  listContainer,
  listPageContainer,
  searchContainer,
  searchInput,
} from "./tems.css";

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

const Tems: NextPage<TemProps> = ({ tems }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const searcher = useMemo(
    () =>
      new Fuse(tems, {
        keys: ["name", "number", "types", "traits"],
        includeScore: true,
        shouldSort: true,
        threshold: 0.4,
      }),
    [tems]
  );

  const [range, setRange] = useState(20);
  const [list, setList] = useState<API_TemData[]>([]);
  const renderList = list.slice(0, range);
  const numOfItems = useRef(tems.length);
  const [searchTerm, setSearchTerm] = useState("");

  const search = useCallback(
    debounce((term: string) => {
      setList((list) => {
        const searchResults = searcher.search(term);
        const results = searchResults ? searchResults.map((v) => v.item) : list;
        const data = term === "" ? tems : results;
        return data;
      });
    }, 500),
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
    if (list.length === numOfItems.current || list.length === 0) return;

    document
      .querySelector("#temtem-list")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <>
      <div className={header}>
        <div className={headerBackground}></div>
        <div className={headerContent}>TEMTEMS</div>
      </div>
      <div className={listPageContainer}>
        <div className={searchContainer}>
          <input
            ref={searchRef}
            className={searchInput}
            placeholder="Search by name, number, traits, types, etc.."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <ul className={listContainer} id="temtem-list">
          {renderList.length === 0 && <li>No items found.</li>}
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
    </>
  );
};

export default Tems;
