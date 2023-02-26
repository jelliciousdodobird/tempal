"use client";

import { Tab } from "@headlessui/react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

export type DetailPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const DetailPanel = ({
  customTem,
  updateCustomTem,
}: DetailPanelProps) => {
  const { id, luma } = customTem;
  const toggleLuma = () => updateCustomTem({ id, luma: !luma });
  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">DetailPanel</span>
      <div className="flex flex-col">
        <button
          type="button"
          className="flex bg-neutral-800 w-min"
          onClick={toggleLuma}
        >
          toggle luma
        </button>
      </div>
    </Tab.Panel>
  );
};
