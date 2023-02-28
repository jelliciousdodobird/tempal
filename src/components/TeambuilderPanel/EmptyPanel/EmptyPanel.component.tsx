"use client";

import { Tab } from "@headlessui/react";

export const EmptyPanel = () => {
  return (
    <Tab.Panel className="grid place-items-center rounded-lg px-4 h-12 font-bold whitespace-nowrap w-min text-red-500 bg-red-900/50">
      Please pick a Temtem first!
    </Tab.Panel>
  );
};
