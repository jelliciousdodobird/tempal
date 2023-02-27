// To parse this data:
//
//   import { Convert } from "./file";
//
//   const traits = Convert.toTraits(json);

type Traits = {
    name:        string;
    wikiUrl:     string;
    description: string;
    effect:      string;
}

// Converts JSON strings to/from your types
class Convert {
    public static toTraits(json: string): Traits[] {
        return JSON.parse(json);
    }

    public static traitsToJson(value: Traits[]): string {
        return JSON.stringify(value);
    }
}
export {} 
