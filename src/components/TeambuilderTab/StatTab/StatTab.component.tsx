"use client";

import clsx from "clsx";
import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { Stats, StatsWithTotal } from "../../../utils/augmented-types/temtems";
import { calcHP, calcSTA, calcStat } from "../../../utils/stat-calcs";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";
import { useState } from "react";

type StatTabProps = {
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

const BASE_COLOR = "[#5bfff4]/60";
const SV_COLOR = "fuchsia-500/60";
const TV_COLOR = "yellow-300/60";

export const StatTab = ({ customTem, baseStats }: StatTabProps) => {
  const lvl = customTem.level;
  const base = baseStats ?? DEFAULT_BASE_STATS; // baseStats can be null if the user hasn't selected a temtem so we pass some defaults / feel free to change the DEFAULT_BASE_STATS so that the "skeleton" looks good
  const sv = customTem.svSpread;
  const tv = customTem.tvSpread;

  const hp = calcHP(lvl, base.hp, sv.hp, tv.hp);
  const hpBase = calcHP(lvl, base.hp, 0, 0);
  const hpSV = hp - calcHP(lvl, base.hp, 0, tv.hp);
  const hpTV = hp - calcHP(lvl, base.hp, sv.hp, 0);

  const sta = calcSTA(lvl, base.sta, sv.sta, tv.sta);
  const staBase = calcSTA(lvl, base.sta, 0, 0);
  const staSV = sta - calcSTA(lvl, base.sta, 0, tv.sta);
  const staTV = sta - calcSTA(lvl, base.sta, sv.sta, 0);

  const spd = calcStat(lvl, base.spd, sv.spd, tv.spd);
  const spdBase = calcStat(lvl, base.spd, 0, 0);
  const spdSV = spd - calcStat(lvl, base.spd, 0, tv.spd);
  const spdTV = spd - calcStat(lvl, base.spd, sv.spd, 0);

  const atk = calcStat(lvl, base.atk, sv.atk, tv.atk);
  const atkBase = calcStat(lvl, base.atk, 0, 0);
  const atkSV = atk - calcStat(lvl, base.atk, 0, tv.atk);
  const atkTV = atk - calcStat(lvl, base.spd, sv.spd, 0);

  const def = calcStat(lvl, base.def, sv.def, tv.def);
  const defBase = calcStat(lvl, base.def, 0, 0);
  const defSV = def - calcStat(lvl, base.def, 0, tv.def);
  const defTV = def - calcStat(lvl, base.def, sv.def, 0);

  const spatk = calcStat(lvl, base.spatk, sv.spatk, tv.spatk);
  const spatkBase = calcStat(lvl, base.spatk, 0, 0);
  const spatkSV = spatk - calcStat(lvl, base.spatk, 0, tv.spatk);
  const spatkTV = spatk - calcStat(lvl, base.spatk, sv.spatk, 0);

  const spdef = calcStat(lvl, base.spdef, sv.spdef, tv.spdef);
  const spdefBase = calcStat(lvl, base.spdef, 0, 0);
  const spdefSV = spdef - calcStat(lvl, base.spdef, 0, tv.spdef);
  const spdefTV = spdef - calcStat(lvl, base.spdef, sv.spdef, 0);

  return (
    <Tab className="isolate relative flex flex-col gap-2 min-w-[14rem] outline-none appearance-none">
      {({ selected }) => (
        <>
          <span className="isolate relative text-left text-xs font-bold w-full">
            <TeambuilderTabLabel label="Stats" selected={selected} />
            {selected && <TabHighlight />}
          </span>
          <div className="flex flex-col w-full">
            <Statline
              statLabel="HP"
              total={hp}
              base={hpBase}
              sv={hpSV}
              tv={hpTV}
            />
            <Statline
              statLabel="STA"
              total={sta}
              base={staBase}
              sv={staSV}
              tv={staTV}
            />
            <Statline
              statLabel="SPD"
              total={spd}
              base={spdBase}
              sv={spdSV}
              tv={spdTV}
            />
            <Statline
              statLabel="ATK"
              total={atk}
              base={atkBase}
              sv={atkSV}
              tv={atkTV}
            />
            <Statline
              statLabel="DEF"
              total={def}
              base={defBase}
              sv={defSV}
              tv={defTV}
            />
            <Statline
              statLabel="SP ATK"
              total={spatk}
              base={spatkBase}
              sv={spatkSV}
              tv={spatkTV}
            />
            <Statline
              statLabel="SP DEF"
              total={spatk}
              base={spdefBase}
              sv={spdefSV}
              tv={spdefTV}
            />
          </div>
        </>
      )}
    </Tab>
  );
};

const getStatAsPercentage = (stat: number, maxStat = 600) =>
  (stat / maxStat) * 100;

type StatlineProps = {
  statLabel: string;
  total: number;
  base: number;
  sv: number;
  tv: number;
};

const Statline = ({ statLabel, total, base, sv, tv }: StatlineProps) => {
  const [visibleStat, setVisibleStat] = useState(total);

  const basePercentage = getStatAsPercentage(base);
  const svPercentage = getStatAsPercentage(sv);
  const tvPercentage = getStatAsPercentage(tv);
  const baseWidth = `${basePercentage}%`;
  const svWidth = `${svPercentage}%`;
  const tvWidth = `${tvPercentage}%`;

  const coloring = () => {
    if (visibleStat === total) return `text-white/30`;
    if (visibleStat === base) return `text-indigo-500`;
    if (visibleStat === sv) return `text-fuchsia-500`;
    if (visibleStat === tv) return `text-yellow-500`;
  };

  return (
    <span className={`flex items-center justify-between w-full text-white/30`}>
      <span
        className={`text-[10px] w-[5rem] flex justify-between font-bold whitespace-nowrap pr-2 ${coloring()}`}
      >
        <span
          className=""
          onClick={() => {
            setVisibleStat(total);
          }}
        >
          {statLabel}
        </span>
        <span className="">{visibleStat}</span>
      </span>
      <span className="w-[176px]">
        <span className="flex w-full h-1 bg-white/5 rounded-md">
          <span
            className={`flex h-full bg-indigo-500`}
            style={{ width: baseWidth }}
            onMouseEnter={() => {
              setVisibleStat(base);
            }}
            onMouseLeave={() => {
              setVisibleStat(total);
            }}
          />
          <span
            className={`flex h-full bg-fuchsia-500`}
            style={{ width: svWidth }}
            onMouseEnter={() => {
              setVisibleStat(sv);
            }}
            onMouseLeave={() => {
              setVisibleStat(total);
            }}
          />
          <span
            className={`flex h-full bg-yellow-500`}
            style={{ width: tvWidth }}
            onMouseEnter={() => {
              setVisibleStat(tv);
            }}
            onMouseLeave={() => {
              setVisibleStat(total);
            }}
          />
        </span>
      </span>
    </span>
  );
};
