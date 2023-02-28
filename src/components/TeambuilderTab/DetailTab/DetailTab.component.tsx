"use client";

import { Tab } from "@headlessui/react";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { CustomTem } from "../../../store/temteam-store";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";

type DetailTabProps = {
  customTem: CustomTem;
};

export const DetailTab = ({ customTem }: DetailTabProps) => {
  const { luma, level, nickname } = customTem;
  return (
    <Tab className="isolate relative flex flex-col gap-2 text-sm outline-none appearance-none min-w-[176px] max-w-[176px]">
      {({ selected }) => (
        <>
          <TeambuilderTabLabel label="Details" selected={selected} />
          <div className="flex gap-2 w-full">
            <span className="flex flex-col items-center h-8 w-10 rounded-md bg-gradient-to-b from-transparent to-white/10">
              <span className="font-medium text-[12px] [line-height:10px] text-white/30">
                lvl
              </span>
              <span className="text-xs my-auto text-white/80 font-medium whitespace-nowrap">
                {level}
              </span>
            </span>
            <span className="flex flex-col items-center h-8 w-10 rounded-md bg-gradient-to-b from-transparent to-white/10">
              <span className="font-medium text-[12px] [line-height:10px] text-white/30">
                luma
              </span>
              <span className="text-xs my-auto text-white/80 font-medium whitespace-nowrap">
                {luma ? (
                  <IconCircleCheckFilled size={16} className="text-green-500" />
                ) : (
                  <IconCircleXFilled size={16} className="text-red-500" />
                )}
              </span>
            </span>
            <span className="flex flex-col items-center h-8 flex-1 max-w-full flex-2 rounded-md bg-gradient-to-b from-transparent to-white/10">
              <span className="font-medium text-[12px] [line-height:10px] text-white/30">
                nickname
              </span>
              <span className="text-xs my-auto text-white/80 font-medium whitespace-nowrap max-w-[4.5rem] overflow-hidden">
                {nickname || "-"}
              </span>
            </span>
          </div>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
