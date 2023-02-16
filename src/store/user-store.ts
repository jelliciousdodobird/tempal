import { nanoid } from "nanoid";
import { create, GetState, SetState, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Stats } from "../utils/augmented-types/temtems";
import { HasId } from "../utils/utils";

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

export type CompareTems = {
  compareList: string[];
  addToCompareList: (nameToAdd: string) => void;
  removeFromCompareList: (nameToRemove: string) => void;
};

export const useCompareTems = create<CompareTems>()((set) => ({
  compareList: [],
  addToCompareList: (nameToAdd) =>
    set((state) => {
      const list = state.compareList;
      const i = list.findIndex((name) => name === nameToAdd);
      if (i !== -1) return {};
      return { compareList: [...list, nameToAdd] };
    }),
  removeFromCompareList: (nameToRemove) =>
    set((state) => {
      const list = state.compareList;
      const i = list.findIndex((name) => name === nameToRemove);
      if (i === -1) return {};
      return { compareList: [...list.slice(0, i), ...list.slice(i + 1)] };
    }),
}));

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
  // addToTeam: (nameToAdd: string) => void;
  // removeFromTeam: (nameToRemove: string) => void;
  // updateCustomTem: (updatedTem: Partial<CustomTem>) => void;
};

export type TemTeamsMap = { [id: string]: TemTeam };

// export type TemTeamsSlice = {
//   teams: TemTeamsMap;
//   addToTeam: (teamId: string, temToAdd: string) => void;
//   removeFromTeam: (teamId: string, temToRemove: string) => void;
//   updateCustomTem: (teamId: string, updatedTem: Partial<CustomTem>) => void;
// };

// export type ActiveTeamSlice = {
//   activeTeamId: string;
//   setActiveTeamId: (id: string) => void;
// };

// const createActiveTeamSlice: StateCreator<
//   ActiveTeamSlice & TemTeamsSlice,
//   ["zustand/persist", Partial<ActiveTeamSlice & TemTeamsSlice>],
//   [],
//   ActiveTeamSlice
// > = (set) => ({
//   activeTeamId: "",
//   setActiveTeamId: (id: string) =>
//     set((state) => {
//       const list = state.compareList;
//       const i = list.findIndex((name) => name === nameToRemove);
//       if (i === -1) return {};
//       return { compareList: [...list.slice(0, i), ...list.slice(i + 1)] };
//     }),
// });

// export const useTeams = create<Teams>()((set) => ({
//   compareList: [],
//   addToCompareList: (nameToAdd) =>
//     set((state) => {
//       const list = state.compareList;
//       const i = list.findIndex((name) => name === nameToAdd);
//       if (i !== -1) return {};
//       return { compareList: [...list, nameToAdd] };
//     }),
//   removeFromCompareList: (nameToRemove) =>
//     set((state) => {
//       const list = state.compareList;
//       const i = list.findIndex((name) => name === nameToRemove);
//       if (i === -1) return {};
//       return { compareList: [...list.slice(0, i), ...list.slice(i + 1)] };
//     }),
// }));

export interface MainStore {
  activeTeamId: string;
  setActiveTeamId: (id: string) => void;

  teams: TemTeam[];

  addTemTeam: () => void;
  removeTemTeam: (teamId: string) => void;

  addToTeam: (temToAdd: string) => void;
  removeFromTeam: (temId: string) => void;
  // updateCustomTem: (updatedTem: Partial<CustomTem>) => void;
}

export const useMainStore = create<MainStore>()(
  persist(
    (set) => ({
      activeTeamId: "",
      setActiveTeamId: (id: string) => {
        set((state) => ({
          activeTeamId: id in state.teams ? id : state.activeTeamId,
        }));
      },

      teams: [],
      addTemTeam: () => {
        set((state) => {
          const { teams } = state;
          const temTeam = createTemTeam();
          return {
            activeTeamId: temTeam.id,
            teams: [...teams, temTeam],
          };
        });
      },

      removeTemTeam: (teamId) => {
        set((state) => {
          const teamz = state.teams;
          const i = teamz.findIndex((team) => team.id === teamId);
          if (i === -1) return state;

          // updated teams list and activeId
          const teams = [...teamz.slice(0, i), ...teamz.slice(i + 1)];
          const activeTeamId = teams.length < 1 ? "" : teamz[0].id;

          return { activeTeamId, teams };
        });
      },

      addToTeam: (temToAdd) => {
        set((state) => {
          const { activeTeamId, teams } = state;

          const i = teams.findIndex((team) => team.id === activeTeamId);
          if (i === -1) return state;

          const temTeam = teams[i];

          const updatedTemTeam: TemTeam = {
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
        });
      },

      removeFromTeam: (temId) => {
        set((state) => {
          const teamz = state.teams;
          const [temTeam, i] = getItemAndIndex(teamz, state.activeTeamId);
          if (!temTeam) return state;

          const [tem, j] = getItemAndIndex(temTeam.team, temId);
          if (!tem) return state;

          const updatedTemTeam = {
            ...temTeam,
            team: [...temTeam.team.slice(0, j), ...temTeam.team.slice(j + 1)],
          };

          return state;
        });
      },

      // updateCustomTem: (updatedTem) => {
      //   set((state) => {
      //     return state;
      //   });
      // },
    }),
    { name: "main-store", version: 0 }
  )
);

// removeFromTeam: (temId) => {
//   set((state) => {
//     // const teamz = state.teams;
//     // const [temTeam, i] = getItemAndIndex(teamz, state.activeTeamId);
//     // if (!temTeam) return state;

//     // const [tem, j] = getItemAndIndex(temTeam.team, temId);
//     // if (!tem) return state;

//     // const updatedTemTeam = {
//     //   ...temTeam,
//     //   team: [...temTeam.team.slice(0, j), ...temTeam.team.slice(j + 1)],
//     // };

//     return state;
//     // return { teams: [...teamz] };
//   });
// },
