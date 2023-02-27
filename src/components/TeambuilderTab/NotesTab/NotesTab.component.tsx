"use client";

import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";

export type NotesTabProps = {
  customTem: CustomTem;
};

export const NotesTab = ({ customTem }: NotesTabProps) => {
  const { notes } = customTem;
  return (
    <Tab className="isolate relative flex flex-col gap-2 text-sm outline-none appearance-none h-44 aspect-square">
      {({ selected }) => (
        <>
          <span className="isolate relative text-left text-xs font-bold w-full">
            <TeambuilderTabLabel label="Notes" selected={selected} />
            {selected && <TabHighlight />}
          </span>
          <p className="rounded-md text-left line-clamp-6 w-full h-full px-1 text-sm text-white/50 bg-white/[0.01]zz">
            {notes || "No notes written."}
          </p>
        </>
      )}
    </Tab>
  );
};
