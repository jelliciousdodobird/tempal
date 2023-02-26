"use client";

import clsx from "clsx";
import { Dialog } from "@headlessui/react";
import { ReactNode, useState } from "react";

type PageModalProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  children: ReactNode;
};

export const PageModal = ({ isOpen, setIsOpen, children }: PageModalProps) => {
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={close} className="relative">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      {/* The actual panel */}
      <div className="fixed inset-0 gridzzplace-items-center border border-red-500">
        <Dialog.Panel
          className={clsx(
            "relative flex flex-col gap-6 bg-neutral-800/60 backdrop-blur-md rounded-xl p-6",
            "min-w-[20rem] h-min"
          )}
        >
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
