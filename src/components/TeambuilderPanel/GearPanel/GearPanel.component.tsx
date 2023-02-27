"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { useFetchAllGears } from "../../../hooks/useFetchGearQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

export type GearPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const GearPanel = ({ customTem, updateCustomTem }: GearPanelProps) => {
  const { data, isLoading, isError } = useFetchAllGears();

  if (isLoading || isError || !data)
    return (
      <div className="relative outline-none appearance-none cursor-pointer animate-pulse">
        <figure className="relative flex w-10 h-10 rounded-full overflow-hidden bg-neutral-800"></figure>
      </div>
    );

  return (
    <Tab.Panel className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        {data.map((gear) => (
          <div key={gear.name} className="flex gap-2">
            <figure className="h-12 w-12">
              <Image
                alt=""
                src={gear.wikiIconUrl}
                width={50}
                height={50}
                quality={100}
                className="flex object-contain w-full h-full"
              />
            </figure>
            <span className="font-bold min-w-[10rem] max-w-[10rem]">
              {gear.name}
            </span>
            <span className="">{gear.gameDescription}</span>
          </div>
        ))}
      </div>
    </Tab.Panel>
  );
};
