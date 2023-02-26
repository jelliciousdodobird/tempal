import { TypeElement } from "./temtems";

export const VALID_TECHNIQUE_DATA_FIELDS = [
  "name",
  "type",
  "class",
  "damage",
  "hold",
  "cost",
  "priority",
  "targeting",
  "synergy type",
  "synergy description",
  "synergy damage",
  "synergy sta",
  "synergy hold",
  "synergy priority",
  "synergy targeting",
  "synergy effects",
] as const;

export const VALID_CLASSES = ["status", "special", "physical"] as const;
export const VALID_SYN_TYPES = [
  "damage",
  "targeting",
  "unknown",
  "condition",
  "buff",
] as const;

export const VALID_TARGETS = [
  "othertarget",
  "otherteamorally",
  "others",
  "oneteam",
  "onetarget",
  "self",
  "all",
] as const;

export type TechniqueDataField = typeof VALID_TECHNIQUE_DATA_FIELDS[number];
export type Class = typeof VALID_CLASSES[number];
export type SynType = typeof VALID_SYN_TYPES[number];
export type Targeting = typeof VALID_TARGETS[number];

export const isTechniqueDataField = (str: any): str is TechniqueDataField =>
  VALID_TECHNIQUE_DATA_FIELDS.some((field) => field === str);
export const isClass = (str: any): str is Class =>
  VALID_CLASSES.some((c) => c === str);
export const isSynType = (str: any): str is SynType =>
  VALID_SYN_TYPES.some((synType) => synType === str);
export const isTargeting = (str: any): str is Targeting =>
  VALID_TARGETS.some((target) => target === str);

export type TechniqueData = {
  name: string;
  type: TypeElement;
  class: Class;
  damage: number;
  hold: number;
  cost: number;
  priority: number;
  targeting: Targeting;
  "synergy type": null | TypeElement;
  "synergy description": null | string;
  "synergy damage": null | number;
  "synergy sta": null | number;
  "synergy hold": null | number;
  "synergy priority": null | number;
  "synergy targeting": null | Targeting;
  "synergy effects": null | string;
};

export type TechDescription = {
  effectText: string;
  synergyText: string;
};

export type FullTechnique = TechniqueData & TechDescription;

// export type Synergy = TypeElement | "None";

// export type SynergyEffect = {
//   damage: number;
//   type: SynType;
//   effect: string;
// };
// import { TypeElement } from "./temtems";

// export const VALID_TECHNIQUE_DATA_FIELDS = [
//   "name",
//   "wikiUrl",
//   "type",
//   "class",
//   "classIcon",
//   "damage",
//   "staminaCost",
//   "hold",
//   "priority",
//   "priorityIcon",
//   "synergy",
//   "synergyEffects",
//   "targets",
//   "description",
//   "effectText",
//   "synergyText",
//   "effects",
// ] as const;

// export const VALID_PRIORITIES = [
//   "verylow",
//   "normal",
//   "low",
//   "high",
//   "ultra",
//   "veryhigh",
// ] as const;

// export const VALID_CLASSES = ["Status", "Special", "Physical"] as const;
// export const VALID_SYN_TYPES = [
//   "damage",
//   "targeting",
//   "unknown",
//   "condition",
//   "buff",
// ] as const;

// export const VALID_TARGETS = [
//   "Single Other Target",
//   "Other Team or Ally",
//   "All Other Temtem",
//   "Single Team",
//   "Single Target",
//   "Self",
//   "All",
// ] as const;

// export type TechniqueDataField = typeof VALID_TECHNIQUE_DATA_FIELDS[number];
// export type Priority = typeof VALID_PRIORITIES[number];
// export type Class = typeof VALID_CLASSES[number];
// export type SynType = typeof VALID_SYN_TYPES[number];
// export type Target = typeof VALID_TARGETS[number];

// export const isTechniqueDataField = (str: any): str is TechniqueDataField =>
//   VALID_TECHNIQUE_DATA_FIELDS.some((field) => field === str);
// export const isPriority = (str: any): str is Priority =>
//   VALID_PRIORITIES.some((priority) => priority === str);
// export const isClass = (str: any): str is Class =>
//   VALID_CLASSES.some((c) => c === str);
// export const isSynType = (str: any): str is SynType =>
//   VALID_SYN_TYPES.some((synType) => synType === str);
// export const isTarget = (str: any): str is Target =>
//   VALID_TARGETS.some((target) => target === str);

// export type TechniqueData = {
//   name: string;
//   wikiUrl: string;
//   type: Synergy;
//   class: Class;
//   classIcon: string;
//   damage: number;
//   staminaCost: number;
//   hold: number;
//   priority: Priority;
//   priorityIcon: string;
//   synergy: Synergy;
//   synergyEffects: SynergyEffect[];
//   targets: Target;
//   description: string;
//   effectText: string;
//   synergyText: string;
//   effects: any[];
// };

// export type Synergy = TypeElement | "None";

// export type SynergyEffect = {
//   damage: number;
//   type: SynType;
//   effect: string;
// };
