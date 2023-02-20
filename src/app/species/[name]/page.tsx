import { AddTemToTeamButton } from "../../../components/AddTemToTeamButton/AddTemToTeamButton.component";
import { fetchTemtem } from "../../../utils/fetch";
import Image from "next/image";
import { FavoritesButton } from "../../../components/FavoritesButton/FavoritesButton.component";
import { ClientDebug } from "../../../components/ClientDebug/ClientDebug";
import { Temtem } from "../../../utils/augmented-types/temtems";

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

      <DumbImage url={tem.portraitWikiUrl} />
      <DumbImage url={tem.wikiRenderStaticUrl} />
      <DumbImage url={tem.wikiRenderAnimatedUrl} />
      <DumbImage url={tem.wikiRenderStaticLumaUrl} />
      <DumbImage url={tem.wikiRenderAnimatedLumaUrl} />
      <ClientDebug value={params} />

      <div>{JSON.stringify(tem, null, 2)}</div>
    </div>
  );
}

const DumbImage = ({ url }: { url: string }) => {
  return (
    <div className="p-4 flex flex-col gap-2 border border-neutral-500 rounded-xl">
      <div className="flex w-[100px] h-[100px] ">
        <Image
          alt={url}
          src={url}
          height={100}
          width={100}
          quality={100}
          className="flex object-contain w-full h-full"
        />
      </div>
      <div>{url}</div>
    </div>
  );
};

export async function generateStaticParams() {
  const temNames: Pick<Temtem, "name">[] = await fetchTemtem({
    fields: ["name"],
  });

  return temNames.map(({ name }) => ({ name: encodeURIComponent(name) }));
}
