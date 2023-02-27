"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { Temtem } from "../../../utils/augmented-types/temtems";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";
import { formatTemName } from "../../../utils/utils";
import { typeElementIcons } from "../../../utils/data";

export type TemPortaitTabProps = {
  customTem: CustomTem;
  temData: Temtem | null;
};

export const TemPortraitTab = ({ customTem, temData }: TemPortaitTabProps) => {
  const staticImg = temData ? temData.wikiRenderStaticUrl : "";
  const animatedImg = temData ? temData.wikiRenderAnimatedUrl : "";
  const staticImgLuma = temData ? temData.wikiRenderStaticLumaUrl : "";
  const animatedImgLuma = temData ? temData.wikiRenderAnimatedLumaUrl : "";

  const { luma, name } = customTem;
  const mainImg = luma ? animatedImgLuma : animatedImg;
  const altDesc =
    "Idle animation for " + (luma ? "luma " : "") + (temData?.name || "");

  const displayName = formatTemName(name) || "Temtem";
  return (
    <Tab className="flex items-end isolate relative min-w-[140px] max-w-[140px] h-44 outline-none appearance-none">
      {({ selected }) => (
        <>
          <span className="absolute top-0 left-0 w-min h-min flex">
            <TeambuilderTabLabel label={displayName} selected={selected} />
          </span>
          {temData && (
            <span className="absolute top-0 right-0 w-min h-min flex">
              {temData.types[0] && (
                <span className="relative w-5 h-5">
                  <Image
                    alt={"Type Element for " + temData.types[0]}
                    src={typeElementIcons[temData.types[0]]}
                    width={50}
                    height={50}
                  />
                </span>
              )}
              {temData.types[1] && (
                <span className="relative w-5 h-5">
                  <Image
                    alt={"Type Element for " + temData.types[1]}
                    src={typeElementIcons[temData.types[1]]}
                    width={50}
                    height={50}
                  />
                </span>
              )}
            </span>
          )}
          <figure className="relative flex w-full h-fullzz aspect-square overflow-hidden pointer-events-none">
            {temData ? (
              <Image
                alt={altDesc}
                src={mainImg}
                width={200}
                height={200}
                quality={100}
                className="z-10 relative flex object-contain w-full h-full"
              />
            ) : (
              <span className="grid place-items-center absolute inset-0 text-9xl font-bold animate-pulse text-white/50 font-mono">
                ?
              </span>
            )}
          </figure>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
