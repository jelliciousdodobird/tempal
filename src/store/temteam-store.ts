"use client";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stats } from "../utils/augmented-types/temtems";
import { getRandomTeamName } from "../utils/generation";
import { AtLeast, HasId } from "../utils/utils";

export const FULL_TEAM = 8;

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
  addTemTeam: (toTop?: boolean) => void;
  removeTemTeam: (teamId: string) => void;

  // manipulates individual tems relative to the active TemTeam
  addToTeam: (temToAdd: string) => void;
  removeFromTeam: (temId: string) => void;
  updateCustomTem: (updatedTem: AtLeast<CustomTem, "id">) => void;
  addToTeamOnSlot: (temToAdd: string, slot: number) => void;
};

export const useTemTeamsStore = create<TemTeamsState>()(
  persist(
    (set) => ({
      activeTeamId: "",
      setActiveTeamId: (teamId) => set((state) => ({ activeTeamId: teamId })),

      teams: createEmptyTeams(3),
      addTemTeam: (toTop = false) =>
        set((state) => {
          toTop = typeof toTop === "boolean" ? toTop : false;
          const { teams } = state;

          const teamName = `Team ${getRandomTeamName()}`;
          const temTeam = createEmptyTeam(teamName);

          return {
            activeTeamId: temTeam.id, // set the activeId to new temteam
            teams: toTop ? [temTeam, ...teams] : [...teams, temTeam], // add to the start or end if the list
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
      addToTeamOnSlot: (temToAdd: string, slot: number) =>
        set((state) => {
          const { teams, activeTeamId } = state;
          const [temTeam, i] = getItemAndIndex(teams, activeTeamId);
          if (!temTeam) return state;

          const updatedTemTeam = {
            ...temTeam,
            team: [
              ...temTeam.team.slice(0, slot),
              createCustomTem(temToAdd),
              ...temTeam.team.slice(slot + 1),
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
    { name: "my-teams", version: 1 }
  )
);

export function getDefaultStats(): Stats {
  return {
    hp: 0,
    sta: 0,
    spd: 0,
    atk: 0,
    def: 0,
    spatk: 0,
    spdef: 0,
  };
}

export function getMaxSVs(): Stats {
  return {
    hp: 50,
    sta: 50,
    spd: 50,
    atk: 50,
    def: 50,
    spatk: 50,
    spdef: 50,
  };
}

export function createCustomTem(nameOfTem: string, order = 0): CustomTem {
  return {
    id: nanoid(),
    order: order,
    name: nameOfTem,
    nickname: "",
    trait: "",
    gear: "",
    techniques: [],
    svSpread: getMaxSVs(),
    tvSpread: getDefaultStats(),
    notes: "",
  };
}

export function createTemTeam(teamName = ""): TemTeam {
  return {
    id: nanoid(),
    order: 0,
    teamName,
    team: [],
  };
}

export function createEmptyTeam(teamName = ""): TemTeam {
  const temTeam = createTemTeam(teamName);
  temTeam.team = [...Array(FULL_TEAM).keys()].map((i) =>
    createCustomTem("", i)
  );
  return temTeam;
}

export function createEmptyTeams(numOfTeams = 3): TemTeam[] {
  return [...Array(numOfTeams).keys()].map(() =>
    createEmptyTeam(`Team ${getRandomTeamName()}`)
  );
}

export function getItemAndIndex<T extends HasId>(
  arr: T[],
  id: string
): [T | undefined, number] {
  const index = arr.findIndex((item) => item.id === id);
  return [arr[index], index];
}
