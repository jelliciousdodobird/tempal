"use client";

import Image from "next/image";
import { Listbox, Tab } from "@headlessui/react";
import { useFetchAllGears } from "../../../hooks/useFetchGearQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";
import { Fragment, useMemo, useRef, useState } from "react";
import { PanelFilterInput } from "../../PanelFilterInput/PanelFilterInput.component";
import { fuzzy } from "../../../utils/utils";
import clsx from "clsx";
import { IconCheck } from "@tabler/icons-react";

type GearPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

const LOADING_ITEMS = [...Array(8).keys()];

export const GearPanel = ({ customTem, updateCustomTem }: GearPanelProps) => {
  const { id, name, gear: gearName } = customTem;
  const { data = [], isLoading, isError } = useFetchAllGears();

  const [filter, setFilter] = useState("");
  const filteredData = useMemo(() => {
    return filter === ""
      ? data
      : data.filter(
          (gear) => fuzzy(gear.name, filter) || fuzzy(gear.description, filter)
        );
  }, [filter, data]);

  if (name === "") return <EmptyPanel />;

  if (isLoading || isError || !data)
    return (
      <Tab.Panel className="flex flex-col gap-8 animate-pulse" tabIndex={-1}>
        <div className="rounded-lg bg-neutral-800 h-12 w-full max-w-sm" />
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-0 md:gap-8">
          {LOADING_ITEMS.map((gear, i) => (
            <li key={gear} className="h-full w-full">
              <div className="flex gap-2 rounded-xl px-4 py-4 h-full w-full">
                <div className="relative grid place-items-center min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] p-1 rounded-lg overflow-hidden bg-neutral-800"></div>
                <dl className="flex flex-col gap-1 w-full h-full">
                  <dt className="flex justify-between text-left font-bold h-6 w-24 rounded-md bg-neutral-800"></dt>
                  <dd className="text-left text-sm text-neutral-500 h-12 w-full  rounded-md bg-neutral-800">
                    {/* {gear.gameDescription || "No description."} */}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Tab.Panel>
    );

  const setGear = (gear: string) => updateCustomTem({ id, gear });

  return (
    <Tab.Panel className="flex flex-col gap-8" tabIndex={-1}>
      <PanelFilterInput
        placeholder="Filter by gear name or description"
        value={filter}
        setValue={setFilter}
        htmlFor="gears-search-filter"
      />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-0 md:gap-8">
        {filteredData.length === 0 && (
          <li className="text-red-500 px-4">No results found.</li>
        )}
        {filteredData.map((gear, i) => (
          <li key={gear.name} className="h-full w-full">
            <button
              type="button"
              onClick={() => setGear(gear.name)}
              className={clsx(
                "flex gap-2 rounded-xl outline-none appearance-none px-4 py-4 h-full w-full border",
                // "hover:bg-neutral-800/50 focus-visible:bg-neutral-800/50"
                "hover:bg-neutral-800/80 focus-visible:bg-neutral-800/80",
                "hover:border-white/10 focus-visible:border-white/10",
                gear.name === gearName
                  ? "border-emerald-900"
                  : "border-neutral-800/0"
              )}
            >
              <div className="relative grid place-items-center min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] p-1 rounded-lg overflow-hidden">
                <span
                  className={clsx(
                    "absolute inset-0",
                    colors[i % colors.length]
                  )}
                ></span>
                <Image
                  alt=""
                  src={"https://temtem-api.mael.tech" + gear.icon}
                  width={50}
                  height={50}
                  quality={100}
                  className="relative flex object-contain w-full h-full brightness-0 saturate-100 invertzz opacity-90"
                />
              </div>
              <dl className="flex flex-col gap-1 w-full h-full">
                <dt className="flex justify-between text-left font-bold">
                  {gear.name}
                  {gear.name === gearName && (
                    <span className="grid place-items-center h-full aspect-square rounded-full text-xs bg-emerald-900/50 text-emerald-500">
                      <IconCheck size={16} stroke={2.5} />
                    </span>
                  )}
                </dt>
                <dd className="text-left text-sm text-neutral-500 max-w-[250px]">
                  {gear.gameDescription || "No description."}
                </dd>
              </dl>
            </button>
          </li>
        ))}
      </ul>
    </Tab.Panel>
  );
};

const colors = [
  "bg-gradient-to-r from-amber-600 to-rose-500",
  "bg-gradient-to-r from-emerald-500 to-sky-500",
  "bg-gradient-to-r from-purple-500 to-indigo-500",
  "bg-gradient-to-r from-green-500 to-yellow-500",
  "bg-gradient-to-r from-red-500 to-purple-500",
];
