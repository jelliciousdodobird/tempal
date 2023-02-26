"use client";

import { Tab } from "@headlessui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CustomTem } from "../../../store/temteam-store";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";

export type DetailTabProps = {
  customTem: CustomTem;
};

export const DetailTab = ({ customTem }: DetailTabProps) => {
  return (
    <Tab className="isolate relative flex flex-col gap-2 text-sm outline-none appearance-none">
      {({ selected }) => (
        <>
          <span className="text-left text-xs font-bold pl-1">Details</span>
          <div className="flex gap-2">
            <span className="flex flex-col items-center h-8 px-2 rounded-md bg-gradient-to-b from-transparent to-neutral-800">
              <span className="font-bold text-[12px] [line-height:10px] text-neutral-500">
                lvl
              </span>
              <span className="text-sm font-bold">{customTem.level}</span>
            </span>
            <span className="flex flex-col items-center h-8 px-2 rounded-md bg-gradient-to-b from-transparent to-neutral-800">
              <span className="font-bold text-[12px] [line-height:10px] text-neutral-500">
                luma
              </span>
              <span className="text-xs">
                {customTem.luma ? (
                  <IconCheck
                    size={16}
                    stroke={2.5}
                    className="text-green-500"
                  />
                ) : (
                  <IconX size={16} stroke={2.5} className="text-red-500" />
                )}
              </span>
            </span>
            <span className="flex flex-col items-center h-8 px-2 rounded-md bg-gradient-to-b from-transparent to-neutral-800">
              <span className="font-bold text-[12px] [line-height:10px] text-neutral-500">
                nickname
              </span>
              <span className="text-xs">{customTem.nickname || "-"}</span>
            </span>
          </div>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
