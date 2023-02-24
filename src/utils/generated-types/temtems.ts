// To parse this data:
//
//   import { Convert } from "./file";
//
//   const temtems = Convert.toTemtems(json);

type Temtems = {
    number:                    number;
    name:                      string;
    types:                     TypeElement[];
    portraitWikiUrl:           string;
    lumaPortraitWikiUrl:       string;
    wikiUrl:                   string;
    stats:                     { [key: string]: number };
    traits:                    string[];
    details:                   Details;
    techniques:                Technique[];
    trivia:                    string[];
    evolution:                 Evolution;
    wikiPortraitUrlLarge:      string;
    lumaWikiPortraitUrlLarge:  string;
    locations:                 Location[];
    icon:                      string;
    lumaIcon:                  string;
    genderRatio:               GenderRatio;
    catchRate:                 number;
    hatchMins:                 number;
    tvYields:                  { [key: string]: number };
    gameDescription:           string;
    wikiRenderStaticUrl:       string;
    wikiRenderAnimatedUrl:     string;
    wikiRenderStaticLumaUrl:   string;
    wikiRenderAnimatedLumaUrl: string;
    renderStaticImage:         string;
    renderStaticLumaImage:     string;
    renderAnimatedImage:       string;
    renderAnimatedLumaImage:   string;
}

type Details = {
    height: Height;
    weight: Weight;
}

type Height = {
    cm:     number;
    inches: number;
}

type Weight = {
    kg:  number;
    lbs: number;
}

type Evolution = {
    evolves:        boolean;
    stage?:         number;
    evolutionTree?: EvolutionTree[];
    type?:          EvolutionTreeType;
    from?:          EvolutionTree | null;
    to?:            EvolutionTree | null;
    number?:        number;
    name?:          string;
    level?:         number;
    trading?:       boolean;
    traits?:        string[];
    traitMapping?:  { [key: string]: string };
    description?:   string;
}

type EvolutionTree = {
    stage:        number;
    number:       number;
    name:         string;
    level:        number;
    type:         EvolutionTreeType;
    trading:      boolean;
    traits:       string[];
    traitMapping: { [key: string]: string };
    description?: string;
}

type EvolutionTreeType = "levels" | "trade" | "special";

type GenderRatio = {
    male:   number;
    female: number;
}

type Location = {
    location:  string;
    place:     string;
    note:      Note;
    island:    Island;
    frequency: string;
    level:     string;
    freetem:   Freetem;
}

type Freetem = {
    minLevel:   number;
    maxLevel:   number;
    minPansuns: number | null;
    maxPansuns: number | null;
}

type Island = "Cipanku" | "Deniz" | "Tucma" | "Omninesia" | "Kisiwa" | "Arbury";

type Note = "" | "Dojo";

type Technique = {
    name:    string;
    source:  Source;
    levels?: number;
}

type Source = "Levelling" | "Breeding" | "TechniqueCourses";

type TypeElement = "Digital" | "Water" | "Toxic" | "Nature" | "Wind" | "Neutral" | "Electric" | "Melee" | "Fire" | "Earth" | "Crystal" | "Mental";

// Converts JSON strings to/from your types
class Convert {
    public static toTemtems(json: string): Temtems[] {
        return JSON.parse(json);
    }

    public static temtemsToJson(value: Temtems[]): string {
        return JSON.stringify(value);
    }
}
export {} 
