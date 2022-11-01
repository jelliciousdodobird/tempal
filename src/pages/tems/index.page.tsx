import { assignInlineVars } from "@vanilla-extract/dynamic";
import axios from "axios";
import { nanoid } from "nanoid";
import type { NextPage, GetStaticProps } from "next";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TemCard } from "../../components/TemCard/TemCard/TemCard.component";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.component";

import { TemType } from "../../utils/types";
import { header, list, listPageContainer } from "./tems.css";

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
  // const [range, setRange] = useState(tems.length);
  const [range, setRange] = useState(20);
  const renderList = tems.slice(0, range);
  const numOfItems = useRef(tems.length);

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

  return (
    <div className={listPageContainer}>
      <div className={header}>Temtems</div>
      <ThemeSwitch />
      <ul className={list}>
        {renderList.map((v) => (
          <TemCard
            key={v.number}
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
        ))}
      </ul>
    </div>
  );
};

export default Tems;
