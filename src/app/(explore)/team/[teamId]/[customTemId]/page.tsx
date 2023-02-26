"use client";

import { useState } from "react";
import { PageModal } from "../../../../../components/PageModal/PageModal.component";
import {
  TechniqueMenu,
  TechOption,
} from "../../../../../components/TechniqueMenu/TechniqueMenu.component";
import { useFetchTemQuery } from "../../../../../hooks/useFetchTemQuery";
import { useHasMounted } from "../../../../../hooks/useHasMounted";
import { useTemTeamsStore } from "../../../../../store/temteam-store";

type SpecieParam = {
  teamId: string;
  customTemId: string;
};

type Props = {
  params: SpecieParam;
};

export default function EditCustomTemPage({ params }: Props) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div className="relative flex flex-col gap-8 min-h-full pb-8">
      <EditCustomTem {...params} />
    </div>
  );
}

type PanelType =
  | "gear"
  | "tech-slot-0"
  | "tech-slot-1"
  | "tech-slot-2"
  | "tech-slot-3";
type ModalState = { isOpen: boolean; panel: PanelType };

const EditCustomTem = ({ teamId, customTemId }: SpecieParam) => {
  const { updateCustomTem, teams } = useTemTeamsStore();
  const team = teams.find((team) => team.id === teamId);
  const tem = team?.team.find((tem) => tem.id === customTemId);
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    tem?.name || ""
  );

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    panel: "gear",
  });

  if (!data || isLoading || isError || isPaused) return <></>;
  if (!team || !tem) return <></>;

  const temData = data[0];

  const updateTech = (slot: number) => {
    return (option: TechOption) => {
      const techs = [...tem.techniques];
      updateCustomTem({
        id: customTemId,
        techniques: [
          ...techs.slice(0, slot),
          option.techName,
          ...techs.slice(slot + 1),
        ],
      });
    };
  };

  const techOptions: TechOption[] = temData
    ? temData.techniques.map((tech) => ({
        techName: tech.name,
        alreadySelected: tem.techniques.some(
          (learned) => learned === tech.name
        ),
      }))
    : [];

  const setIsOpen = (value: boolean) => {
    setModalState((v) => ({ ...v, isOpen: value }));
  };

  return (
    <div className="border border-red-500">
      <button
        type="button"
        className="rounded-xl px-2 h-8 bg-neutral-700/50"
        onClick={() => setModalState({ isOpen: true, panel: "gear" })}
      >
        gear
      </button>
      <button
        type="button"
        className="rounded-xl px-2 h-8 bg-neutral-700/50"
        onClick={() => setModalState({ isOpen: true, panel: "tech-slot-0" })}
      >
        tech0
      </button>
      <button
        type="button"
        className="rounded-xl px-2 h-8 bg-neutral-700/50"
        onClick={() => setModalState({ isOpen: true, panel: "tech-slot-1" })}
      >
        tech1
      </button>
      {/* {tem.techniques.map((tech, slot) => (
        <TechniqueMenu
          key={tech + slot}
          value={{ techName: tech, alreadySelected: false }}
          setValue={updateTech(slot)}
          options={techOptions}
        />
      ))} */}
    </div>
  );
};
{
  /* <PageModal isOpen={modalState.isOpen} setIsOpen={setIsOpen}>
        {modalState.panel === "gear" && <div>gear</div>}
        {modalState.panel === "tech-slot-0" && (
          <TechniqueMenu
            value={{ techName: tem.techniques[0], alreadySelected: false }}
            setValue={updateTech(0)}
            options={techOptions}
          />
        )}
        {modalState.panel === "tech-slot-1" && (
          <TechniqueMenu
            value={{ techName: tem.techniques[1], alreadySelected: false }}
            setValue={updateTech(1)}
            options={techOptions}
          />
        )}
        {modalState.panel === "tech-slot-2" && (
          <TechniqueMenu
            value={{ techName: tem.techniques[2], alreadySelected: false }}
            setValue={updateTech(2)}
            options={techOptions}
          />
        )}
        {modalState.panel === "tech-slot-3" && (
          <TechniqueMenu
            value={{ techName: tem.techniques[3], alreadySelected: false }}
            setValue={updateTech(3)}
            options={techOptions}
          />
        )}
      </PageModal> */
}
