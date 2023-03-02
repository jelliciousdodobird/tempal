"use client";

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

const LIMIT = 500;

type NotesPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const NotesPanel = ({ customTem, updateCustomTem }: NotesPanelProps) => {
  const { id, notes, name } = customTem;
  const updateNotes = (value: string) => updateCustomTem({ id, notes: value });
  const htmlFor = "notes for " + name;
  const hitLimit = notes.length === LIMIT;

  if (name === "") return <EmptyPanel />;
  return (
    <Tab.Panel className="flex flex-col gap-4" tabIndex={-1}>
      <div className="flex flex-col gap-2 max-w-sm w-full">
        <label
          htmlFor={htmlFor}
          className="flex justify-between text-xs font-bold px-1"
        >
          <span className="">Notes</span>
          <span
            className={clsx(hitLimit ? "text-red-600" : "text-neutral-500")}
          >{`${notes.length}/${LIMIT}`}</span>
        </label>
        <div className="flex overflow-hidden rounded-lg">
          <textarea
            id={htmlFor}
            rows={6}
            className="resize-none outline-none appearance-none rounded-lg w-full px-3 py-2 bg-neutral-800 text-neutral-400 focus:bg-white/10 focus:border-white/20 border border-transparent custom-scrollbar-tiny overflow-hidden"
            value={notes}
            onChange={(e) => updateNotes(e.target.value.slice(0, LIMIT))}
          />
        </div>
      </div>
    </Tab.Panel>
  );
};
