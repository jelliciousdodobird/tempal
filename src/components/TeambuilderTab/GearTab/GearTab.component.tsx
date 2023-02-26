"use client";

import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";

export type GearTabProps = { customTem: CustomTem };

export const GearTab = ({ customTem }: GearTabProps) => {
  return (
    <Tab className="isolate relative flex flex-col gap-1 outline-none appearance-none">
      {({ selected }) => (
        <>
          <span className="text-left text-xs font-bold pl-1">Gear</span>
          <div className="flex items-center gap-2 rounded-md px-2 w-full h-8 text-sm text-neutral-400 bg-neutral-800">
            {customTem.gear || "-"}
          </div>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
