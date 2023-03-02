"use client";

import { Tab } from "@headlessui/react";
import * as Slider from "@radix-ui/react-slider";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { Stats, StatsWithTotal } from "../../../utils/augmented-types/temtems";
import { calcHP, calcSTA, calcStat } from "../../../utils/stat-calcs";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

const DEFAULT_BASE_STATS: Stats = {
  hp: 0,
  sta: 0,
  spd: 0,
  atk: 0,
  def: 0,
  spatk: 0,
  spdef: 0,
};

const SV_MIN = 1;
const SV_MAX = 50;
const TV_MIN = 0;
const TV_MAX = 500;
const TOTAL_TV_MAX = 1000;

type StatPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const StatPanel = ({ customTem, updateCustomTem }: StatPanelProps) => {
  const { name } = customTem;
  const { data = [], isLoading, isError } = useFetchTemQuery(customTem.name);

  const enabledQuery = name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  const lvl = customTem.level;
  const base = data[0] ? data[0].stats : DEFAULT_BASE_STATS;
  // const sv = customTem.svSpread;
  // const tv = customTem.tvSpread;

  const [sv, setSV] = useState(customTem.svSpread);
  const [tv, setTV] = useState(customTem.tvSpread);

  useEffect(() => {
    setSV(customTem.svSpread);
  }, [customTem.svSpread]);

  useEffect(() => {
    setTV(customTem.tvSpread);
  }, [customTem.tvSpread]);

  // const containerRef = useRef(null);

  // const h = () => {
  //   console.log(customTem.svSpread);
  //   setSV(customTem.svSpread);
  //   setTV(customTem.tvSpread);
  // };

  // unfocusReset(containerRef, h);

  const tvTotal = Object.values(tv).reduce((total, value) => {
    return total + value;
  });

  const validate = (value: number, tvStat: keyof Stats) => {
    return value + (tvTotal - tv[tvStat]) > TOTAL_TV_MAX ? false : true;
  };

  const udpateSV = (stat: keyof Stats, value: number) => {
    const currentStats = customTem.svSpread;
    const updatedStats = { ...currentStats, [stat]: value };
    updateCustomTem({ id: customTem.id, svSpread: updatedStats });
  };

  const updateTV = (stat: keyof Stats, value: number) => {
    const currentStats = customTem.tvSpread;
    const updatedStats = { ...currentStats, [stat]: value };
    updateCustomTem({ id: customTem.id, tvSpread: updatedStats });
  };

  // const onChangeSvHp: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   try {
  //     const value = parseInt(e.target.value);
  //     if (!Number.isNaN(value)) udpateSV("hp", value);
  //   } catch (error) {}
  // };

  // const onChangeSvAtk: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   try {
  //     const value = parseInt(e.target.value);
  //     if (!Number.isNaN(value)) udpateSV("atk", value);
  //   } catch (error) {}
  // };

  const onChangeSv = (stat: keyof Stats, e: ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(e.target.value);
      if (!Number.isNaN(value) && value <= SV_MAX) udpateSV(stat, value);
      if (!Number.isNaN(value) && value > SV_MAX)
        e.target.value = sv[stat].toString();
      if (Number.isNaN(value)) setSV({ ...sv, [stat]: "" });
    } catch (error) {}
  };

  const changeSv = (stat: keyof Stats, value: number) => {
    try {
      if (value <= SV_MAX) udpateSV(stat, value);
      if (!Number.isNaN(value) && value > SV_MAX) value = sv[stat];
    } catch (error) {}
  };

  const onChangeTv = (stat: keyof Stats, e: ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(e.target.value);
      if (
        !Number.isNaN(value) &&
        value <= TV_MAX &&
        value + (tvTotal - tv[stat]) <= TOTAL_TV_MAX
      )
        updateTV(stat, value);
      if (value + (tvTotal - tv[stat]) > TOTAL_TV_MAX)
        e.target.value = tv[stat].toString();
    } catch (error) {}
  };

  const changeTv = (stat: keyof Stats, value: number) => {
    try {
      if (value <= TV_MAX && value + (tvTotal - tv[stat]) <= TOTAL_TV_MAX)
        updateTV(stat, value);
      if (value + (tvTotal - tv[stat]) > TOTAL_TV_MAX) value = tv[stat];
    } catch (error) {}
  };

  const hpTotal = calcHP(lvl, base.hp, sv.hp, tv.hp);
  const staTotal = calcSTA(lvl, base.sta, sv.sta, tv.sta);
  const spdTotal = calcStat(lvl, base.spd, sv.spd, tv.spd);
  const atkTotal = calcStat(lvl, base.atk, sv.atk, tv.atk);
  const defTotal = calcStat(lvl, base.def, sv.def, tv.def);
  const spatkTotal = calcStat(lvl, base.spatk, sv.spatk, tv.spatk);
  const spdefTotal = calcStat(lvl, base.spdef, sv.spdef, tv.spdef);

  if (name === "") return <EmptyPanel />;
  if (isTrueLoading || isError)
    return (
      <div className="rounded-full w-20 h-20 animate-pulse bg-neutral-700"></div>
    );

  return (
    <Tab.Panel className="flex flex-col gap-4" tabIndex={-1}>
      <table
        // ref={containerRef}
        className="w-[30rem]zz text-center border-separate border-spacing-2 backdrop-blur-md shadow-lg bg-neutral-800/90 rounded-lg"
      >
        <caption className="font-bold text-lg capitalize w-fullzz text-left p-4">
          stats panel
        </caption>
        <colgroup>
          <col span={1} className="stat bg-neutral-900 w-[2rem]" />
          <col span={1} className="base w-[2rem]" />
          <col span={1} className="sv w-[6rem]zz" />
          <col span={1} className="tv w-[6rem]zz" />
          <col span={1} className="total w-[2rem]" />
        </colgroup>
        <thead>
          <tr className="uppercase font-bold h-[3rem] bg-neutral-900">
            <th scope="col" className="text-right p-2">
              stat
            </th>
            <th scope="col" className="p-2">
              base
            </th>
            <th scope="col" className="p-2">
              sv
            </th>
            <th scope="col" className="p-2">
              tv
            </th>
            <th scope="col" className="p-2">
              total
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="bg-neutral-700/30 backdrop-blur-md shadow-lg text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              hp
            </th>
            <td className="p-2">{base.hp}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="hpSV" className="hidden"></label>
                <input
                  id="hpSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.hp ?? ""}
                  onChange={(e) => {
                    onChangeSv("hp", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.hp]}
                  onValueChange={(v) => setSV({ ...sv, hp: v[0] })}
                  onValueCommit={(v) => changeSv("hp", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="hpTV" className="hidden"></label>
                <input
                  id="hpTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.hp}
                  onChange={(e) => {
                    onChangeTv("hp", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.hp]}
                  onValueChange={(v) =>
                    validate(v[0], "hp") && setTV({ ...tv, hp: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "hp") && changeTv("hp", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{hpTotal}</td>
          </tr>
          <tr className="backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              sta
            </th>
            <td className="p-2">{base.sta}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="staSV" className="hidden"></label>
                <input
                  id="staSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.sta ?? ""}
                  onChange={(e) => {
                    onChangeSv("sta", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.sta]}
                  onValueChange={(v) => setSV({ ...sv, sta: v[0] })}
                  onValueCommit={(v) => changeSv("sta", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="staTV" className="hidden"></label>
                <input
                  id="staTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.sta ?? ""}
                  onChange={(e) => {
                    onChangeTv("sta", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.sta]}
                  onValueChange={(v) =>
                    validate(v[0], "sta") && setTV({ ...tv, sta: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "sta") && changeTv("sta", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{staTotal}</td>
          </tr>
          <tr className="bg-neutral-700/30 backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              spd
            </th>
            <td className="p-2">{base.spd}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spdSV" className="hidden"></label>
                <input
                  id="spdSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.spd ?? ""}
                  onChange={(e) => {
                    onChangeSv("spd", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.spd]}
                  onValueChange={(v) => setSV({ ...sv, spd: v[0] })}
                  onValueCommit={(v) => changeSv("spd", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spdTV" className="hidden"></label>
                <input
                  id="spdTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.spd ?? ""}
                  onChange={(e) => {
                    onChangeTv("spd", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.spd]}
                  onValueChange={(v) =>
                    validate(v[0], "spd") && setTV({ ...tv, spd: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "spd") && changeTv("spd", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{spdTotal}</td>
          </tr>
          <tr className="backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              atk
            </th>
            <td className="p-2">{base.atk}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="atkSV" className="hidden"></label>
                <input
                  id="atkSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.atk ?? ""}
                  onChange={(e) => {
                    onChangeSv("atk", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.atk]}
                  onValueChange={(v) => setSV({ ...sv, atk: v[0] })}
                  onValueCommit={(v) => changeSv("atk", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="atkTV" className="hidden"></label>
                <input
                  id="atkTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.atk ?? ""}
                  onChange={(e) => {
                    onChangeTv("atk", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.atk]}
                  onValueChange={(v) =>
                    validate(v[0], "atk") && setTV({ ...tv, atk: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "atk") && changeTv("atk", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{atkTotal}</td>
          </tr>
          <tr className="bg-neutral-700/30 backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              def
            </th>
            <td className="p-2">{base.def}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="defSV" className="hidden"></label>
                <input
                  id="defSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.def ?? ""}
                  onChange={(e) => {
                    onChangeSv("def", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.def]}
                  onValueChange={(v) => setSV({ ...sv, def: v[0] })}
                  onValueCommit={(v) => changeSv("def", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="defTV" className="hidden"></label>
                <input
                  id="defTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.def ?? ""}
                  onChange={(e) => {
                    onChangeTv("def", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.def]}
                  onValueChange={(v) =>
                    validate(v[0], "def") && setTV({ ...tv, def: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "def") && changeTv("def", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{defTotal}</td>
          </tr>
          <tr className="backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              spatk
            </th>
            <td className="p-2">{base.spatk}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spatkSV" className="hidden"></label>
                <input
                  id="spatkSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.spatk ?? ""}
                  onChange={(e) => {
                    onChangeSv("spatk", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.spatk]}
                  onValueChange={(v) => setSV({ ...sv, spatk: v[0] })}
                  onValueCommit={(v) => changeSv("spatk", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spatkTV" className="hidden"></label>
                <input
                  id="spatkTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.spatk ?? ""}
                  onChange={(e) => {
                    onChangeTv("spatk", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.spatk]}
                  onValueChange={(v) =>
                    validate(v[0], "spatk") && setTV({ ...tv, spatk: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "spatk") && changeTv("spatk", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{spatkTotal}</td>
          </tr>
          <tr className="bg-neutral-700/30 backdrop-blur-md shadow-lg h-[2rem] text-xs">
            <th
              scope="row"
              className="font-bold whitespace-nowrap tracking-wider uppercase text-right p-2 text-base"
            >
              spdef
            </th>
            <td className="p-2">{base.spdef}</td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spdefSV" className="hidden"></label>
                <input
                  id="spdefSV"
                  type="number"
                  min={SV_MIN}
                  max={SV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={sv.spdef ?? ""}
                  onChange={(e) => {
                    onChangeSv("spdef", e);
                  }}
                />
                <Slider.Root
                  min={SV_MIN}
                  max={SV_MAX}
                  step={1}
                  value={[sv.spdef]}
                  onValueChange={(v) => setSV({ ...sv, spdef: v[0] })}
                  onValueCommit={(v) => changeSv("spdef", v[0])}
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">
              <div
                className="flex flex-row flex-nowrap gap-2 justify-center items-center
              "
              >
                <label htmlFor="spdefTV" className="hidden"></label>
                <input
                  id="spdefTV"
                  type="number"
                  min={TV_MIN}
                  max={TV_MAX}
                  className="text-xs p-1 outline-none bg-white/5  rounded-md w-16 text-center invalid:border-2 border-red-500 focus:bg-neutral-400/30 hover:bg-neutral-400/30"
                  value={tv.spdef ?? ""}
                  onChange={(e) => {
                    onChangeTv("spdef", e);
                  }}
                />
                <Slider.Root
                  min={TV_MIN}
                  max={TV_MAX}
                  step={1}
                  value={[tv.spdef]}
                  onValueChange={(v) =>
                    validate(v[0], "spdef") && setTV({ ...tv, spdef: v[0] })
                  }
                  onValueCommit={(v) =>
                    validate(v[0], "spdef") && changeTv("spdef", v[0])
                  }
                  className="relative flex items-center select-none touch-none w-full h-full"
                >
                  <Slider.Track className="rounded-full h-1 w-full bg-white/5">
                    <Slider.Range className="h-full bg-blue-500/50" />
                  </Slider.Track>
                  <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
                </Slider.Root>
              </div>
            </td>
            <td className="p-2">{spdefTotal}</td>
          </tr>
        </tbody>
      </table>
      <div>Applied TVs: {tvTotal}</div>
      <div>Remaining TVs: {TOTAL_TV_MAX - tvTotal}</div>
      <div>
        <span>sv</span>
        <span>{JSON.stringify(customTem.svSpread)}</span>
      </div>
      <div>
        <span>tv</span>
        <span>{JSON.stringify(customTem.tvSpread)}</span>
      </div>
    </Tab.Panel>
  );
};

// const unfocusReset = (
//   ref: React.RefObject<HTMLElement>,
//   handler: () => void
// ) => {
//   useEffect(() => {
//     const handleClickOutside = (e: any) => {
//       const el = ref?.current;
//       if (el && !el.contains(e.target as Node)) {
//         console.log("Clicked off, resetting");
//         handler();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);
// };
