import axios from "axios";
import type { NextPage, GetStaticProps } from "next";

import React, { useEffect, useRef, useState } from "react";
import { TemCard } from "../../components/TemCard/TemCard.component";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.component";
import { TemType } from "../../utils/types";
// import { TemType } from "../../data/temtems";
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  // console.log(tems);

  return (
    <div className={listPageContainer} ref={containerRef}>
      <div className={header}>Temtems</div>
      <ThemeSwitch />

      <div className={list}>
        {/* {tems.slice(0, 80).map((v) => ( */}
        {tems.map((v) => (
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
      </div>
    </div>
  );
};

export default Tems;
