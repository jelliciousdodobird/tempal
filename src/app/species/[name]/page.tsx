import { AddTemToTeamButton } from "../../../components/AddTemToTeamButton/AddTemToTeamButton.component";
import { Temtem } from "../../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../../utils/fetch";
import Image from "next/image";
import { FavoritesButton } from "../../../components/FavoritesButton/FavoritesButton.component";

// CANT DO THIS YET: Needs Next.js 13.2
// export async function generateMetadata({ params, ...props }: Props) {
//   return { title: params };
// }

export const revalidate = 43200; // revalidate this page every 12 hours (in seconds)

type SpecieParam = {
  name: string;
};

type Props = {
  params: SpecieParam;
};

export default async function Tem({ params }: Props) {
  const data = await fetchTemtem({ names: [params.name] });

  const tem = data[0];

  return (
    <div className="relative flex flex-col gap-8 min-h-fullzz pb-8 overflow-x-hiddenzz w-full">
      <AddTemToTeamButton temName={params.name} />
      <FavoritesButton temName={params.name} />
      {/* {JSON.stringify(data, null, 2)} */}

      <div className="flex w-[100px] h-[100px] rounded-fullzzbg-neutral-700">
        <Image
          alt={tem.name + " image"}
          src={tem.wikiRenderStaticUrl}
          height={100}
          width={100}
          quality={100}
          className="flex object-contain w-full h-full"
        />
      </div>
      <div>{tem.wikiRenderStaticUrl}</div>
      <div className="flex w-[100px] h-[100px] rounded-fullzzbg-neutral-700">
        <Image
          alt={tem.name + " image"}
          src={tem.portraitWikiUrl}
          height={100}
          width={100}
          quality={100}
          className="flex object-contain w-full h-full"
        />
      </div>
      <div>{tem.portraitWikiUrl}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const temNames: Pick<Temtem, "name">[] = await fetchTemtem({
    fields: ["name"],
  });
  return temNames.map(({ name }) => ({ name }));
}
