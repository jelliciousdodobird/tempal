import { Temtem } from "../../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../../utils/fetch";

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

  return (
    <pre className="relative flex flex-col gap-8 min-h-full pb-8 overflow-x-hiddenzz">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export async function generateStaticParams() {
  const temNames: Pick<Temtem, "name">[] = await fetchTemtem({
    fields: ["name"],
  });
  return temNames.map(({ name }) => ({ name }));
}
