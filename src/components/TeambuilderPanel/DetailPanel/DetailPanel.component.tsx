"use client";

import { Tab } from "@headlessui/react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

const LIMIT = 30;

type DetailPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const DetailPanel = ({
  customTem,
  updateCustomTem,
}: DetailPanelProps) => {
  const { id, luma, nickname, name } = customTem;
  const toggleLuma = () => updateCustomTem({ id, luma: !luma });
  const updateNickname = (value: string) =>
    updateCustomTem({ id, nickname: value });

  if (name === "") return <EmptyPanel />;

  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">Detail Panel</span>
      <div className="flex flex-col">
        <button
          type="button"
          className="flex bg-neutral-800 w-min whitespace-nowrap"
          onClick={toggleLuma}
        >
          toggle luma
        </button>
        <input
          maxLength={LIMIT}
          type="text"
          className="bg-neutral-800 w-min"
          value={nickname}
          onChange={(e) => updateNickname(e.target.value.slice(0, LIMIT))}
        />
      </div>
    </Tab.Panel>
  );
};
