"use client";

import { Tab } from "@headlessui/react";
import { ChangeEventHandler } from "react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { Stats } from "../../../utils/augmented-types/temtems";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

type StatPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const StatPanel = ({ customTem, updateCustomTem }: StatPanelProps) => {
  const { name } = customTem;
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

  const onChangeSvHp: ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      const value = parseInt(e.target.value);
      if (!Number.isNaN(value)) udpateSV("hp", value);
    } catch (error) {}
  };

  const onChangeSvAtk: ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      const value = parseInt(e.target.value);
      if (!Number.isNaN(value)) udpateSV("atk", value);
    } catch (error) {}
  };

  if (name === "") return <EmptyPanel />;
  return (
    <Tab.Panel className="flex flex-col gap-4" tabIndex={-1}>
      <span className="font-bold">StatPanel</span>
      <div className="flex flex-col">
        <input
          type="number"
          className="bg-neutral-800 w-16"
          value={customTem.svSpread.hp}
          onChange={onChangeSvHp}
        />
        <input
          type="number"
          className="bg-neutral-800 w-16"
          value={customTem.svSpread.atk}
          onChange={onChangeSvAtk}
        />
      </div>
    </Tab.Panel>
  );
};
