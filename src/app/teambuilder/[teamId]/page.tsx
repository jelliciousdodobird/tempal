"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { IconChevronRight, IconChevronUp } from "@tabler/icons-react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { useHasMounted } from "../../../hooks/useHasMounted";
import { motion } from "framer-motion";
import { Portal } from "../../../components/Portal/Portal.component";
import { useTeambuilderUIStore } from "../../../store/teambuilder-ui-store";
import { TemPortraitTab } from "../../../components/TeambuilderTab/TemPortraitTab/TemPortraitTab.component";
import { DetailTab } from "../../../components/TeambuilderTab/DetailTab/DetailTab.component";
import { TraitTab } from "../../../components/TeambuilderTab/TraitTab/TraitTab.component";
import { GearTab } from "../../../components/TeambuilderTab/GearTab/GearTab.component";
import { TechniqueTab } from "../../../components/TeambuilderTab/TechniqueTab/TechniqueTab.component";
import { StatTab } from "../../../components/TeambuilderTab/StatTab/StatTab.component";
import { TemPickerPanel } from "../../../components/TeambuilderPanel/TemPickerPanel/TemPickerPanel.component";
import { StatPanel } from "../../../components/TeambuilderPanel/StatPanel/StatPanel.component";
import { DetailPanel } from "../../../components/TeambuilderPanel/DetailPanel/DetailPanel.component";
import { TraitPanel } from "../../../components/TeambuilderPanel/TraitPanel/TraitPanel.component";
import { GearPanel } from "../../../components/TeambuilderPanel/GearPanel/GearPanel.component";
import { TechniquePanel } from "../../../components/TeambuilderPanel/TechniquePanel/TechniquePanel.component";
import { TeambuilderTabLabel } from "../../../components/TeambuilderTabLabel/TeambuilderTabLabel.component";
import { NotesTab } from "../../../components/TeambuilderTab/NotesTab/NotesTab.component";
import { NotesPanel } from "../../../components/TeambuilderPanel/NotesPanel/NotesPanel.component";
import {
  CustomTem,
  UpdateTem,
  useTemTeamsStore,
} from "../../../store/temteam-store";
import {
  ChangeEventHandler,
  forwardRef,
  Fragment,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from "react";

export type TeambuilderPanelBaseProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

type SpecieParam = {
  teamId: string;
};

type Props = {
  params: SpecieParam;
};

export default function TeamBuilderPage({ params }: Props) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return <TeamBuilder {...params} />;
}

const TeamBuilder = ({ teamId }: SpecieParam) => {
  const { teams, updateCustomTemFromTeam, updateTemTeam } = useTemTeamsStore();
  const temTeam = teams.find((team) => team.id === teamId);

  if (!temTeam) return <div>uhoh</div>;

  const updateTem = (updatedTem: UpdateTem) =>
    updateCustomTemFromTeam(teamId, updatedTem);

  const setTeamName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    updateTemTeam({ id: temTeam.id, teamName: value });
  };

  return (
    <div className="relative flex flex-col min-h-full pb-8">
      <div className="z-20 relative pack-content pt-2 flex items-center ">
        <Link
          href="/teambuilder"
          className="flex items-center gap-1 h-8 hover:underline focus:underline text-white/30"
        >
          Teams
        </Link>
        <IconChevronRight
          size={20}
          stroke={2.5}
          className="text-white/30 ml-2"
        />
        <input
          type="text"
          value={temTeam.teamName}
          onChange={setTeamName}
          spellCheck={false}
          autoComplete="off"
          className="flex h-8 px-2 rounded-md outline-none appearance-none font-bold bg-transparent hover:bg-white/10 focus:bg-white/10"
        />
      </div>
      <motion.div className="z-10 sticky top-16 flex flex-col pt-4 backdrop-blur-lg bg-neutral-900/70 border-bzzborder-white/20 shadow-lg touch-none">
        <Tab.Group
          as="div"
          className="z-10 relative pack-content flex flex-col w-full"
        >
          <DraggableTabList>
            <div className="flex gap-3">
              {temTeam.team.map((tem) => (
                <CirclePortraitTab key={tem.id} customTem={tem} />
              ))}
            </div>
          </DraggableTabList>

          <Tab.Panels as={Fragment}>
            {temTeam.team.map((tem) => (
              <Tab.Panel key={tem.id} as={Fragment}>
                <EditSelectorTabGroup
                  customTem={tem}
                  updateCustomTem={updateTem}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <ToggleDrawerButton />
        <div
          id="bg-image-glow"
          className="-z-10 absolute bottom-0 w-full h-[calc(100%+6.5rem)] overflow-hidden"
        ></div>
      </motion.div>

      <div className="pack-content flex flex-col gap-4 min-h-[30rem] py-6">
        <div id="teambuilder-editing-panel"></div>
      </div>
    </div>
  );
};

const ToggleDrawerButton = () => {
  const { toggleIsOpen, isOpen } = useTeambuilderUIStore();
  return (
    <button
      type="button"
      className="relative z-0 group/drawer-btn grid place-items-center w-full h-4 appearance-none outline-none text-neutral-500 from-transparent to-white/5 border-b border-white/[7%] hover:bg-gradient-to-b hover:text-white hover:border-white/20"
      onClick={toggleIsOpen}
    >
      <IconChevronUp
        size={16}
        className={clsx(
          "transition-[transform] rounded-sm",
          isOpen ? "rotate-0" : "rotate-180",
          "group-focus-visible/drawer-btn:ring-1 ring-white "
        )}
      />
    </button>
  );
};

const DraggableTabList = forwardRef<HTMLDivElement, { children: ReactNode }>(
  function DraggableTabList({ children }, ref) {
    const containerRef = useRef<HTMLDivElement>(null!);

    return (
      <div
        ref={containerRef}
        className="relative flex w-full max-w-min cursor-move"
      >
        <Tab.List
          ref={ref}
          className="flex gap-3"
          as={motion.div}
          drag="x"
          dragConstraints={containerRef}
        >
          {children}
        </Tab.List>
      </div>
    );
  }
);

const CirclePortraitTab = ({ customTem }: { customTem: CustomTem }) => {
  const { toggleIsOpen } = useTeambuilderUIStore();
  const { data, isLoading, isError } = useFetchTemQuery(customTem.name);
  const enabledQuery = customTem.name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <Tab as={Fragment}>
        <div className="relative outline-none appearance-none cursor-pointer">
          <figure className="relative flex w-10 h-10 rounded-full overflow-hidden shadow-md bg-white/10"></figure>
        </div>
      </Tab>
    );

  const tem = data ? data[0] : null;
  const name = tem?.name || "";

  const portraitUrl = tem ? tem.portraitWikiUrl : "";
  const staticImg = tem ? tem.wikiRenderStaticUrl : "";
  const staticImgLuma = tem ? tem.wikiRenderStaticLumaUrl : "";

  const { luma } = customTem;
  const bgImageUrl = luma ? staticImgLuma : staticImg;

  const toggleDrawer = (selected: boolean) => selected && toggleIsOpen();

  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div
          className="relative outline-none appearance-none cursor-pointer"
          onClick={() => toggleDrawer(selected)}
        >
          <figure className="z-10 relative flex w-10 h-10 rounded-full overflow-hidden shadow-md">
            {portraitUrl && (
              <Image
                alt=""
                src={portraitUrl}
                width={100}
                height={100}
                quality={100}
                className="z-0 absolute flex object-contain w-full h-full scale-150 blur-md"
              />
            )}
            {portraitUrl && (
              <Image
                alt={"Tem image for " + name}
                src={portraitUrl}
                width={100}
                height={100}
                quality={100}
                className="z-10 relative flex object-contain w-full h-full"
              />
            )}
            {!tem && <span className="absolute inset-0 bg-white/10" />}
          </figure>
          {selected && (
            <div className="z-0 absolute rounded-full -inset-1 overflow-hidden border-2 border-emerald-500 animate-pulse"></div>
          )}
          {selected && bgImageUrl && (
            <Portal portalToId="bg-image-glow">
              <Image
                alt=""
                src={bgImageUrl}
                width={100}
                height={100}
                quality={20}
                className="z-0 absolute flex object-contain w-full h-full scale-[8] blur-md pointer-events-none opacity-20 select-none"
              />
            </Portal>
          )}
        </div>
      )}
    </Tab>
  );
};

const CustomTemDrawer = ({
  customTem,
  selectedIndex,
}: {
  customTem: CustomTem;
  selectedIndex: number;
}) => {
  const isOpen = useTeambuilderUIStore((state) => state.isOpen);
  const { data, isLoading, isError } = useFetchTemQuery(customTem.name);
  const enabledQuery = customTem.name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <div className="relative outline-none appearance-none cursor-pointer animate-pulse">
        <figure className="relative flex w-10 h-10 rounded-full overflow-hidden bg-neutral-800"></figure>
      </div>
    );

  const tem = data ? data[0] : null;

  const { luma } = customTem;
  const temLinkImage = luma
    ? tem?.wikiRenderAnimatedLumaUrl
    : tem?.wikiRenderAnimatedUrl;

  const techSelected = selectedIndex > 3 && selectedIndex < 8;
  const techSlot = selectedIndex - 3;
  const techniqueLabel = techSelected ? `Technique ${techSlot}` : "Techniques";

  return (
    <div
      className={clsx(
        "flex items-end w-full max-w-min",
        !isOpen && "pointer-events-none",
        "transition-[height,opacity,filter] ease-in-out duration-200",
        isOpen ? "h-[200px] opacity-100 blur-0" : "h-0 opacity-50 blur-md"
      )}
    >
      <div className="flex gap-8 pt-6">
        <TemPortraitTab customTem={customTem} temData={tem} />
        <div className="flex flex-col gap-2">
          <DetailTab customTem={customTem} />
          <TraitTab customTem={customTem} />
          <GearTab customTem={customTem} />
        </div>
        <div className="flex flex-col gap-2 min-w-[10rem]">
          <TeambuilderTabLabel
            label={techniqueLabel}
            selected={techSelected}
            disabled
          />
          <TechniqueTab customTem={customTem} slot={0} />
          <TechniqueTab customTem={customTem} slot={1} />
          <TechniqueTab customTem={customTem} slot={2} />
          <TechniqueTab customTem={customTem} slot={3} />
        </div>
        <StatTab customTem={customTem} baseStats={tem?.stats || null} />
        <NotesTab customTem={customTem} />
        <SpecieLinkSquare
          href={"/species/" + (tem?.name || "")}
          imageUrl={temLinkImage || ""}
        />
      </div>
    </div>
  );
};

const SpecieLinkSquare = ({
  href,
  imageUrl,
}: {
  href: string;
  imageUrl: string;
}) => {
  return (
    <Link
      tabIndex={-1}
      href={href}
      className="isolate relative flex justify-center items-center h-44 aspect-square rounded-xl bg-neutral-800/50 "
    >
      <span className="flex items-center text-sm text-white font-bold uppercase ">
        More details
        <IconChevronRight size={20} stroke={2.5} />
      </span>
      <figure className="-z-10 absolute inset-0 rounded-xl overflow-hidden">
        {imageUrl && (
          <Image
            alt=""
            src={imageUrl}
            width={200}
            height={100}
            quality={100}
            className="z-0 absolute flex object-contain w-full h-full scale-[3] blur-md"
          />
        )}
      </figure>
    </Link>
  );
};

const EditSelectorTabGroup = forwardRef<
  HTMLDivElement,
  TeambuilderPanelBaseProps
>(function EditSelectorTabGroup({ customTem, updateCustomTem }, ref) {
  const { name } = customTem;
  const emptySlot = name === "";
  const startingIndex = emptySlot ? 0 : 1;
  const baseProps = { customTem, updateCustomTem };

  return (
    <Tab.Group defaultIndex={startingIndex}>
      {({ selectedIndex }) => (
        <>
          <DraggableTabList ref={ref}>
            <CustomTemDrawer
              customTem={customTem}
              selectedIndex={selectedIndex}
            />
          </DraggableTabList>
          <Portal portalToId="teambuilder-editing-panel">
            <Tab.Panels className="">
              <TemPickerPanel {...baseProps} />
              <DetailPanel {...baseProps} />
              <TraitPanel {...baseProps} />
              <GearPanel {...baseProps} />
              <TechniquePanel {...baseProps} slot={0} />
              <TechniquePanel {...baseProps} slot={1} />
              <TechniquePanel {...baseProps} slot={2} />
              <TechniquePanel {...baseProps} slot={3} />
              <StatPanel {...baseProps} />
              <NotesPanel {...baseProps} />
            </Tab.Panels>
          </Portal>
        </>
      )}
    </Tab.Group>
  );
});
