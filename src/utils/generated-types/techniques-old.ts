// To parse this data:
//
//   import { Convert } from "./file";
//
//   const techniques = Convert.toTechniques(json);

type Techniques = {
    name:           string;
    wikiUrl:        string;
    type:           Synergy;
    class:          Class;
    classIcon:      ClassIcon;
    damage:         number;
    staminaCost:    number;
    hold:           number;
    priority:       Priority;
    priorityIcon:   PriorityIcon;
    synergy:        Synergy;
    synergyEffects: SynergyEffect[];
    targets:        Targets;
    description:    string;
    effectText:     string;
    synergyText:    string;
    effects:        any[];
}

type Class = "Status" | "Special" | "Physical";

type ClassIcon = "/images/icons/technique/Status.png" | "/images/icons/technique/Special.png" | "/images/icons/technique/Physical.png";

type Priority = "verylow" | "normal" | "low" | "high" | "ultra" | "veryhigh";

type PriorityIcon = "/images/icons/priority/verylow.png" | "/images/icons/priority/normal.png" | "/images/icons/priority/low.png" | "/images/icons/priority/high.png" | "/images/icons/priority/ultra.png" | "/images/icons/priority/veryhigh.png";

type Synergy = "Melee" | "Toxic" | "Nature" | "Electric" | "Water" | "Digital" | "Neutral" | "Mental" | "Wind" | "Earth" | "Fire" | "Crystal" | "None";

type SynergyEffect = {
    damage: number;
    type:   Type;
    effect: string;
}

type Type = "damage" | "targeting" | "unknown" | "condition" | "buff";

type Targets = "Single Other Target" | "Other Team or Ally" | "All Other Temtem" | "Single Team" | "Single Target" | "Self" | "All";

// Converts JSON strings to/from your types
class Convert {
    public static toTechniques(json: string): Techniques[] {
        return JSON.parse(json);
    }

    public static techniquesToJson(value: Techniques[]): string {
        return JSON.stringify(value);
    }
}
export {} 
