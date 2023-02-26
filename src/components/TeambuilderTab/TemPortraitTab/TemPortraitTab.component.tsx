"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { CustomTem } from "../../../store/temteam-store";
import { Temtem } from "../../../utils/augmented-types/temtems";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";

export type TemPortaitTabProps = {
  customTem: CustomTem;
  temData: Temtem | null;
};

export const TemPortraitTab = ({ customTem, temData }: TemPortaitTabProps) => {
  const staticImg = temData ? temData.wikiRenderStaticUrl : "";
  const animatedImg = temData ? temData.wikiRenderAnimatedUrl : "";
  const staticImgLuma = temData ? temData.wikiRenderStaticLumaUrl : "";
  const animatedImgLuma = temData ? temData.wikiRenderAnimatedLumaUrl : "";

  const { luma } = customTem;
  const mainImg = luma ? animatedImgLuma : animatedImg;
  const altDesc =
    "Idle animation for " + (luma ? "luma " : "") + (temData?.name || "");

  return (
    <Tab className="isolate relative w-44 h-44 outline-none appearance-none">
      {({ selected }) => (
        <>
          <figure className="relative flex w-full h-full overflow-hidden">
            {/* <div className="absolute inset-10 rounded-full overflow-hidden">
            <Image
              alt=""
              src={mainImg}
              width={200}
              height={100}
              quality={100}
              className="z-0 absolute flex object-contain w-full h-full scale-[3] blur-md animate-pulsezz"
            />
          </div> */}
            {temData && (
              <Image
                alt={altDesc}
                src={mainImg}
                width={200}
                height={200}
                quality={100}
                className="z-10 relative flex object-contain w-full h-full"
              />
            )}
          </figure>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};
