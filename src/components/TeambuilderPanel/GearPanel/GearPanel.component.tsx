"use client";

import { Tab } from "@headlessui/react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

export type GearPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const GearPanel = ({ customTem, updateCustomTem }: GearPanelProps) => {
  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">GearPanel</span>
    </Tab.Panel>
  );
};
