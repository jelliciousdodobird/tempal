// To parse this data:
//
//   import { Convert } from "./file";
//
//   const techniques = Convert.toTechniques(json);

export type Techniques = {
    name:                  string;
    type:                  Type;
    class:                 Class;
    damage:                number;
    hold:                  number;
    cost:                  number;
    priority:              number;
    targeting:             Targeting;
    "synergy type":        Type | null;
    "synergy description": null | string;
    "synergy damage":      number | null;
    "synergy sta":         number | null;
    "synergy hold":        null;
    "synergy priority":    number | null;
    "synergy targeting":   Targeting | null;
    "synergy effects":     null | string;
}

export type Class = "Status" | "Special" | "Physical" | "status" | "physical" | "special";

export type Targeting = "othertarget" | "otherteamorally" | "others" | "oneteam" | "onetarget" | "self" | "all" | "Self";

export type Type = "Melee" | "Toxic" | "Nature" | "Electric" | "Water" | "Digital" | "Neutral" | "Mental" | "Wind" | "digital" | "Earth" | "Fire" | "neutral" | "Crystal" | "earth" | "mental";

// Converts JSON strings to/from your types
export class Convert {
    public static toTechniques(json: string): Techniques[] {
        return JSON.parse(json);
    }

    public static techniquesToJson(value: Techniques[]): string {
        return JSON.stringify(value);
    }
}
