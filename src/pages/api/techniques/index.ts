import { NextApiRequest, NextApiResponse } from "next";

const query =
  "https://temtem.wiki.gg/index.php?title=Special:CargoExport&tables=Techniques%2C&&fields=Techniques.name%2C+Techniques.type%2C+Techniques.class%2C+Techniques.damage%2C+Techniques.hold%2C+Techniques.cost%2C+Techniques.priority%2C+Techniques.targeting%2C+Techniques.synergy_type%2C+Techniques.synergy_description%2C+Techniques.synergy_damage%2C+Techniques.synergy_sta%2C+Techniques.synergy_hold%2C+Techniques.synergy_priority%2C+Techniques.synergy_targeting%2C+Techniques.synergy_effects%2C&&order+by=%60cargo__Techniques%60.%60name%60&limit=500&format=json";

export default async function allTechniquesAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const res2 = await fetch(query);
  const data = await res2.json();

  return res.status(200).json(data);
}
