"use client";

import clsx from "clsx";
import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { Stats, StatsWithTotal } from "../../../utils/augmented-types/temtems";
import { calcHP, calcSTA, calcStat } from "../../../utils/stat-calcs";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";

export type StatTabProps = {
  customTem: CustomTem;
  baseStats: StatsWithTotal | null;
};

const DEFAULT_BASE_STATS: Stats = {
  hp: 0,
  sta: 0,
  spd: 0,
  atk: 0,
  def: 0,
  spatk: 0,
  spdef: 0,
};

export const StatTab = ({ customTem, baseStats }: StatTabProps) => {
  const lvl = customTem.level;
  const base = baseStats ?? DEFAULT_BASE_STATS; // baseStats can be null if the user hasn't selected a temtem so we pass some defaults / feel free to change the DEFAULT_BASE_STATS so that the "skeleton" looks good
  const sv = customTem.svSpread;
  const tv = customTem.tvSpread;

  const hp = calcHP(lvl, base.hp, sv.hp, tv.hp);
  return (
    <Tab className="isolate relative flex flex-col gap-2 min-w-[14rem] outline-none appearance-none">
      {({ selected }) => (
        <>
          <span className="isolate relative text-left text-xs font-bold w-full">
            <TeambuilderTabLabel label="Stats" selected={selected} />
            {selected && <TabHighlight />}
          </span>
          <div className="flex flex-col w-full">
            <Statline statLabel="HP" base={hp} sv={50} tv={500} />
            <Statline statLabel="STA" base={hp} sv={30} tv={50} />
            <Statline statLabel="SPD" base={hp} sv={25} tv={60} />
            <Statline statLabel="ATK" base={hp} sv={0} tv={250} />
            <Statline statLabel="DEF" base={hp} sv={20} tv={90} />
            <Statline statLabel="SP ATK" base={hp} sv={20} tv={322} />
            <Statline statLabel="SP DEF" base={hp} sv={20} tv={400} />
          </div>
        </>
      )}
    </Tab>
  );
};

const getStatAsPercentage = (stat: number, maxStat = 1000) =>
  (stat / maxStat) * 100;

type StatlineProps = {
  statLabel: string;
  base: number;
  sv: number;
  tv: number;
};

const Statline = ({ statLabel, base, sv, tv }: StatlineProps) => {
  const basePercentage = getStatAsPercentage(base);
  const svPercentage = getStatAsPercentage(sv);
  const tvPercentage = getStatAsPercentage(tv);
  const baseWidth = `${basePercentage}%`;
  const svWidth = `${svPercentage}%`;
  const tvWidth = `${tvPercentage}%`;

  return (
    <span className="flex items-center gap-2 w-full">
      <span className="text-[10px] font-bold text-left whitespace-nowrap text-white/30">
        {statLabel}
      </span>
      <span className="flex w-full h-1 bg-white/5">
        <span
          className="flex h-full bg-primary-500"
          style={{ width: baseWidth }}
        />
        <span
          className="flex h-full bg-yellow-500"
          style={{ width: svWidth }}
        />
        <span className="flex h-full bg-red-500" style={{ width: tvWidth }} />
      </span>
    </span>
  );
};
