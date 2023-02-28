"use client";

import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { Technique } from "../../../utils/augmented-types/temtems";
import {
  TechniqueMenu,
  TechOption,
} from "../../TechniqueMenu/TechniqueMenu.component";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

type TechniquePanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
  slot: number;
};

export const TechniquePanel = ({
  customTem,
  updateCustomTem,
  slot,
}: TechniquePanelProps) => {
  const { name } = customTem;
  const { data, isLoading, isError } = useFetchTemQuery(customTem.name);

  const enabledQuery = name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (name === "") return <EmptyPanel />;
  if (isTrueLoading || isError)
    return (
      <div className="rounded-full w-20 h-20 animate-pulse bg-neutral-700"></div>
    );

  if (!data || !data[0])
    return (
      <Tab.Panel className="flex flex-col gap-4">
        <div className="grid place-items-center rounded-full w-20 h-20 bg-neutral-700">
          Pick a tem first
        </div>
      </Tab.Panel>
    );

  const tem = data[0];

  const updateTech = (option: TechOption) => {
    const techs = [...customTem.techniques];
    updateCustomTem({
      id: customTem.id,
      techniques: [
        ...techs.slice(0, slot),
        option.techName,
        ...techs.slice(slot + 1),
      ],
    });
  };

  const techOptions: TechOption[] = tem
    ? tem.techniques.map((tech) => ({
        techName: tech.name,
        alreadySelected: customTem.techniques.some(
          (learned) => learned === tech.name
        ),
      }))
    : [];

  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">TechniquePanel</span>
      <TechniqueMenu
        value={{ techName: customTem.techniques[slot], alreadySelected: false }}
        setValue={updateTech}
        // options={techOptions.slice(0, 5)}
        options={techOptions}
      />
    </Tab.Panel>
  );
};
