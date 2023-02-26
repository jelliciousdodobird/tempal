"use client";

import { Tab } from "@headlessui/react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

export type TraitPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const TraitPanel = ({ customTem, updateCustomTem }: TraitPanelProps) => {
  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">TraitPanel</span>
    </Tab.Panel>
  );
};
