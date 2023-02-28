"use client";

import clsx from "clsx";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { useFetchTechniqueData } from "../../../hooks/useFetchTechniqueData";
import { CustomTem } from "../../../store/temteam-store";
import { typeElementIcons } from "../../../utils/data";
import { TabHighlight } from "../../TabHighlight/TabHighlight.component";
import { TeambuilderTabLabel } from "../../TeambuilderTabLabel/TeambuilderTabLabel.component";

type TechniqueTabProps = { customTem: CustomTem; slot: number };

export const TechniqueTab = ({ customTem, slot }: TechniqueTabProps) => {
  const techName = customTem.techniques[slot];

  return (
    <Tab className="isolate relative flex items-center outline-none appearance-none cursor-pointer min-w-[176px]">
      {({ selected }) => (
        <>
          <span className="absolute -left-6">
            <TeambuilderTabLabel label="" selected={selected} />
          </span>
          <div
            className={clsx(
              "flex items-center rounded-md w-full h-8 text-sm text-neutral-400 bg-white/10 shadow-md whitespace-nowrap",
              !techName && "pl-3"
            )}
          >
            <TechniqueElement techName={techName} />
            {customTem.techniques[slot] || "-"}
          </div>
          {selected && <TabHighlight />}
        </>
      )}
    </Tab>
  );
};

const TechniqueElement = ({ techName }: { techName: string }) => {
  const { data, isLoading, isError } = useFetchTechniqueData(techName);
  const enabledQuery = techName !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <div className="relative flex w-6 h-6 mx-1 rounded-full bg-white/30 animate-pulse" />
    );

  if (!data) return <></>;

  const { type } = data;
  const typeIconUrl = typeElementIcons[type];
  const altDesc = type + " type element for the technique " + techName;

  return (
    <figure className="relative flex w-6 h-6 mx-1">
      <Image
        alt={altDesc}
        src={typeIconUrl}
        width={50}
        height={50}
        quality={100}
        className="z-10 relative flex object-contain w-full h-full"
      />
    </figure>
  );
};
