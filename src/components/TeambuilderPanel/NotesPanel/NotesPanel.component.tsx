"use client";

import { Tab } from "@headlessui/react";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

const LIMIT = 300;

export type NotesPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const NotesPanel = ({ customTem, updateCustomTem }: NotesPanelProps) => {
  const { id, notes } = customTem;
  const updateNotes = (value: string) => updateCustomTem({ id, notes: value });
  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">Notes Panel</span>
      <div className="flex flex-col">
        <input
          type="text"
          maxLength={LIMIT}
          className="bg-neutral-800 w-min"
          value={notes}
          onChange={(e) => updateNotes(e.target.value.slice(0, LIMIT))}
        />
      </div>
    </Tab.Panel>
  );
};
