"use client";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  ChangeEventHandler,
  forwardRef,
  Fragment,
  ReactNode,
  useRef,
  useState,
} from "react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { useHasMounted } from "../../../hooks/useHasMounted";
import {
  CustomTem,
  UpdateTem,
  useTemTeamsStore,
} from "../../../store/temteam-store";
import { motion } from "framer-motion";
import { Portal } from "../../../components/Portal/Portal.component";
import { useTeambuilderUIStore } from "../../../store/teambuilder-ui-store";
import clsx from "clsx";
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
  const [slot, setSlot] = useState(0);

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
          className="flex items-center gap-1 h-8 hover:underline focus:underline text-neutral-500"
        >
          Teams
        </Link>
        <IconChevronRight
          size={20}
          stroke={2.5}
          className="text-neutral-500 ml-2"
        />
        <input
          type="text"
          value={temTeam.teamName}
          onChange={setTeamName}
          className="flex h-8 px-2 rounded-md outline-none appearance-none bg-transparent hover:bg-neutral-800 focus:bg-neutral-800"
        />
      </div>
      <div className="z-10 sticky top-16 flex flex-col pt-4 backdrop-blur-md bg-neutral-900/80 border-bzzborder-white/5 shadow-lg">
        <Tab.Group
          as="div"
          className="z-10 relative pack-content flex flex-col w-full"
        >
          <DraggableTabList>
            {temTeam.team.map((tem) => (
              <PortraitTab key={tem.id} customTem={tem} />
            ))}
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
          className="-z-10 absolute bottom-0 w-full h-[calc(100%+4rem)] overflow-hidden"
        ></div>
      </div>

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
      className="relative z-0 group/drawer-btn grid place-items-center w-full h-4 appearance-none outline-none text-neutral-500 from-transparent to-neutral-800/50 hover:bg-gradient-to-b hover:text-primary-500"
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

const PortraitTab = ({ customTem }: { customTem: CustomTem }) => {
  const { data, isLoading, isError } = useFetchTemQuery(customTem.name);
  const enabledQuery = customTem.name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <Tab as={Fragment}>
        <div className="relative outline-none appearance-none cursor-pointer animate-pulse">
          <figure className="relative flex w-10 h-10 rounded-full overflow-hidden bg-neutral-800"></figure>
        </div>
      </Tab>
    );

  if (!data || !data[0])
    return (
      <Tab as={Fragment}>
        {({ selected }) => (
          <div className="relative outline-none appearance-none cursor-pointer">
            <figure className="relative flex w-10 h-10 rounded-full overflow-hidden bg-neutral-800"></figure>
            {selected && (
              <div className="absolute rounded-full -inset-1 border-2 border-neutral-500"></div>
            )}
          </div>
        )}
      </Tab>
    );

  const tem = data[0];

  const staticImg = tem ? tem.wikiRenderStaticUrl : "";
  const animatedImg = tem ? tem.wikiRenderAnimatedUrl : "";
  const staticImgLuma = tem ? tem.wikiRenderStaticLumaUrl : "";
  const animatedImgLuma = tem ? tem.wikiRenderAnimatedLumaUrl : "";

  // const { luma } = customTem;
  const luma = false;
  const borderImage = luma ? animatedImgLuma : animatedImg;
  const mainImg = luma ? staticImgLuma : staticImg;

  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div className="relative outline-none appearance-none cursor-pointer">
          <figure className="z-10 relative flex w-10 h-10 rounded-full overflow-hidden">
            <Image
              alt=""
              src={tem.portraitWikiUrl}
              width={100}
              height={100}
              quality={100}
              className="z-0 absolute flex object-contain w-full h-full scale-150 blur-md animate-pulsezz"
            />
            <Image
              alt={"Tem image for " + tem.name}
              src={tem.portraitWikiUrl}
              width={100}
              height={100}
              quality={100}
              className="z-10 relative flex object-contain w-full h-full"
            />
          </figure>
          {selected && (
            <div className="z-0 absolute rounded-full -inset-1 bg-white/20 overflow-hidden">
              <Image
                alt=""
                src={borderImage}
                width={50}
                height={50}
                quality={50}
                className="absolute flex object-contain w-full h-full scale-[6] blur-[2px]"
              />
              <div className="absolute inset-[2px] rounded-full overflow-hidden bg-neutral-900" />
            </div>
          )}
          <Portal portalToId="bg-image-glow">
            {selected && (
              <Image
                alt=""
                src={mainImg}
                width={100}
                height={100}
                quality={20}
                className="z-0 absolute flex object-contain w-full h-full scale-[8] blur-md animate-pulsezz opacity-20"
              />
            )}
          </Portal>
        </div>
      )}
    </Tab>
  );
};

const CustomTemDrawer = ({ customTem }: { customTem: CustomTem }) => {
  const toggleCustomTemMenu = useTeambuilderUIStore(
    (state) => state.toggleIsOpen
  );
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

  return (
    <motion.div
      className="flex items-end w-full max-w-min"
      variants={{
        open: { height: "auto", opacity: 1 },
        closed: { height: "0px", opacity: 0 },
      }}
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="flex gap-6 pt-6">
        <TemPortraitTab customTem={customTem} temData={tem} />
        <div className="flex flex-col gap-2">
          <DetailTab customTem={customTem} />
          <TraitTab customTem={customTem} />
          <GearTab customTem={customTem} />
        </div>
        <div className="flex flex-col gap-2 min-w-[10rem]">
          <span className="text-left text-xs font-bold pl-1">Techniques</span>
          <TechniqueTab customTem={customTem} slot={0} />
          <TechniqueTab customTem={customTem} slot={1} />
          <TechniqueTab customTem={customTem} slot={2} />
          <TechniqueTab customTem={customTem} slot={3} />
        </div>
        <StatTab customTem={customTem} baseStats={tem?.stats || null} />
        <Link
          tabIndex={-1}
          href={"/species/" + (tem?.name || "")}
          className="isolate relative flex justify-center items-center w-44 h-44 rounded-xl bg-neutral-900/50"
        >
          {/* <span className="flex mix-blend-difference text-white font-bold"> */}
          <span className="flex  text-neutral-500 font-bold ">
            More details
            <IconChevronRight />
          </span>
          {/* <figure className="relative flex w-full h-full overflow-hidden"> */}
          {/* <div className="-z-10 absolute inset-0 rounded-xl overflow-hidden">
            {tem && (
              <Image
                alt=""
                src={tem.wikiRenderAnimatedUrl}
                width={200}
                height={100}
                quality={100}
                className="z-0 absolute flex object-contain w-full h-full scale-[3] blur-md animate-pulsezz"
              />
            )}
          </div> */}
        </Link>
      </div>
    </motion.div>
  );
};

const EditSelectorTabGroup = forwardRef<
  HTMLDivElement,
  TeambuilderPanelBaseProps
>(function EditSelectorTabGroup({ customTem, updateCustomTem }, ref) {
  const startingIndex = customTem.name === "" ? 0 : 1;
  return (
    <Tab.Group defaultIndex={startingIndex}>
      <DraggableTabList ref={ref}>
        <CustomTemDrawer customTem={customTem} />
      </DraggableTabList>

      <Portal portalToId="teambuilder-editing-panel">
        <Tab.Panels className="">
          <TemPickerPanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
          />
          <DetailPanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
          />
          <TraitPanel customTem={customTem} updateCustomTem={updateCustomTem} />
          <GearPanel customTem={customTem} updateCustomTem={updateCustomTem} />
          <TechniquePanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
            slot={0}
          />
          <TechniquePanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
            slot={1}
          />
          <TechniquePanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
            slot={2}
          />
          <TechniquePanel
            customTem={customTem}
            updateCustomTem={updateCustomTem}
            slot={3}
          />
          <StatPanel customTem={customTem} updateCustomTem={updateCustomTem} />
        </Tab.Panels>
      </Portal>
    </Tab.Group>
  );
});
