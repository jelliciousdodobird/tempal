"use client";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stats } from "../utils/augmented-types/temtems";
import { AtLeast, HasId } from "../utils/utils";

export type CustomTem = {
  id: string;
  order: number;
  name: string;
  nickname: string;
  trait: string;
  gear: string;
  techniques: string[]; // must limit to 4
  svSpread: Stats; // 0 <=each stat <= 50
  tvSpread: Stats; // 0 <=total stats <= 1000
  notes: string;
};

export type TemTeam = {
  id: string;
  order: number;
  teamName: string;
  team: CustomTem[];
};

export type TemTeamsState = {
  activeTeamId: string;
  setActiveTeamId: (teamId: string) => void;

  teams: TemTeam[];

  // manipulates the TemTeam list
  addTemTeam: () => void;
  removeTemTeam: (teamId: string) => void;

  // manipulates individual tems relative to the active TemTeam
  addToTeam: (temToAdd: string) => void;
  removeFromTeam: (temId: string) => void;
  updateCustomTem: (updatedTem: AtLeast<CustomTem, "id">) => void;
};

export const useTemTeamsStore = create<TemTeamsState>()(
  persist(
    (set) => ({
      activeTeamId: "",
      setActiveTeamId: (teamId) => set((state) => ({ activeTeamId: teamId })),

      teams: [] as TemTeam[],
      addTemTeam: () =>
        set((state) => {
          const { teams } = state;
          const temTeam = createTemTeam();
          return {
            activeTeamId: temTeam.id, // set the activeId to new temteam
            teams: [temTeam, ...teams], // add to the beginning
          };
        }),
      removeTemTeam: (teamId) =>
        set((state) => {
          const { teams } = state;
          const [temTeam, i] = getItemAndIndex(teams, teamId);
          if (!temTeam) return state;

          // updated teams list and activeId
          const updatedTeams = [...teams.slice(0, i), ...teams.slice(i + 1)];
          const updatedActiveId =
            updatedTeams.length > 0 ? updatedTeams[0].id : "";

          return {
            activeTeamId: updatedActiveId,
            teams: updatedTeams,
          };
        }),
      addToTeam: (temToAdd) =>
        set((state) => {
          const { teams, activeTeamId } = state;
          const [temTeam, i] = getItemAndIndex(teams, activeTeamId);
          if (!temTeam) return state;

          if (temTeam.team.length > 7) return state; // don't allow more than 8 tems per team

          const updatedTemTeam = {
            ...temTeam,
            team: [...temTeam.team, createCustomTem(temToAdd)],
          };

          return {
            teams: [
              ...teams.slice(0, i),
              updatedTemTeam,
              ...teams.slice(i + 1),
            ],
          };
        }),
      removeFromTeam: (temId) =>
        set((state) => {
          const { teams, activeTeamId } = state;
          const [temTeam, i] = getItemAndIndex(teams, activeTeamId);
          if (!temTeam) return state;

          const { team } = temTeam;
          const [tem, j] = getItemAndIndex(team, temId);
          if (!tem) return state;

          const updatedTemTeam = {
            ...temTeam,
            team: [...temTeam.team.slice(0, j), ...temTeam.team.slice(j + 1)],
          };

          return {
            teams: [
              ...teams.slice(0, i),
              updatedTemTeam,
              ...teams.slice(i + 1),
            ],
          };
        }),
      updateCustomTem: (updatedTem) =>
        set((state) => {
          const { teams, activeTeamId } = state;
          const [temTeam, i] = getItemAndIndex(teams, activeTeamId);
          if (!temTeam) return state;

          const { team } = temTeam;
          const [tem, j] = getItemAndIndex(team, updatedTem.id);
          if (!tem) return state;

          const updatedTemTeam = {
            ...temTeam,
            team: [
              ...temTeam.team.slice(0, j),
              { ...tem, ...updatedTem },
              ...temTeam.team.slice(j + 1),
            ],
          };

          return {
            teams: [
              ...teams.slice(0, i),
              updatedTemTeam,
              ...teams.slice(i + 1),
            ],
          };
        }),
    }),
    { name: "main-store", version: 1 }
  )
);

export const getDefaultStats = (): Stats => ({
  hp: 0,
  sta: 0,
  spd: 0,
  atk: 0,
  def: 0,
  spatk: 0,
  spdef: 0,
});

export const getMaxSVs = (): Stats => ({
  hp: 50,
  sta: 50,
  spd: 50,
  atk: 50,
  def: 50,
  spatk: 50,
  spdef: 50,
});

export const createCustomTem = (nameOfTem: string): CustomTem => ({
  id: nanoid(),
  order: 0,
  name: nameOfTem,
  nickname: "",
  trait: "",
  gear: "",
  techniques: [],
  svSpread: getMaxSVs(),
  tvSpread: getDefaultStats(),
  notes: "",
});

export const createTemTeam = (): TemTeam => ({
  id: nanoid(),
  order: 0,
  teamName: "",
  team: [],
});

export const getItemAndIndex = <T extends HasId>(
  arr: T[],
  id: string
): [T | undefined, number] => {
  const index = arr.findIndex((item) => item.id === id);
  return [arr[index], index];
};
