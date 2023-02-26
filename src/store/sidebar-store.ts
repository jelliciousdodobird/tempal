import { create } from "zustand";
import { persist } from "zustand/middleware";

export const VALID_SIDEBAR_CONTENT = [
  "search",
  "teams",
  "fav",
  "page",
] as const;

export type SidebarContentType = typeof VALID_SIDEBAR_CONTENT[number];

export type SidebarState = {
  contentIsOpen: boolean;
  setContentIsOpen: (value: boolean) => void;

  contentType: SidebarContentType;
  setContentType: (value: SidebarContentType) => void;
};

export const useSidebarState = create<SidebarState>()((set) => ({
  contentIsOpen: true,
  setContentIsOpen: (value) => set((state) => ({ contentIsOpen: value })),
  contentType: "search",
  setContentType: (value) => set((state) => ({ contentType: value })),
}));
