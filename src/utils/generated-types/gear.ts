// To parse this data:
//
//   import { Convert } from "./file";
//
//   const gear = Convert.toGear(json);

type Gear = {
    name:            string;
    wikiUrl:         string;
    wikiIconUrl:     string;
    icon:            string;
    category:        Category;
    consumable:      boolean;
    limitedQuantity: boolean;
    purchasable:     boolean;
    buyPrice:        number;
    description:     string;
    gameDescription: string;
}

type Category = "Gear";

// Converts JSON strings to/from your types
class Convert {
    public static toGear(json: string): Gear[] {
        return JSON.parse(json);
    }

    public static gearToJson(value: Gear[]): string {
        return JSON.stringify(value);
    }
}
export {} 
