import { create } from "zustand";

export type TeambuilderBarState = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleIsOpen: () => void;
  closeIsOpen: () => void;
  openIsOpen: () => void;
};

export const useTeambuilderUIStore = create<TeambuilderBarState>()((set) => ({
  isOpen: true,
  setIsOpen: (value) => set((state) => ({ isOpen: value })),
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  closeIsOpen: () => set((state) => ({ isOpen: false })),
  openIsOpen: () => set((state) => ({ isOpen: true })),
}));
