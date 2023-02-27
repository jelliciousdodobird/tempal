"use client";

import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";

export type TechniqueTabProps = { customTem: CustomTem; slot: number };

export const TechniqueTab = ({ customTem, slot }: TechniqueTabProps) => {
  return (
    <Tab className="isolate relative flex items-center outline-none appearance-none  cursor-pointer min-w-[176px]">
      {({ selected }) => (
        <>
          <div className="flex items-center rounded-md px-2 w-full h-8 text-sm text-neutral-400 bg-white/10 shadow-md">
            {customTem.techniques[slot] || "-"}
          </div>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
