import { fetchTemtem } from "../../../utils/fetch";

type SpecieParam = {
  name: string;
};

type Props = {
  params: SpecieParam;
};

// CANT DO THIS YET: Needs Next.js 13.2
// export async function generateMetadata({ params, ...props }: Props) {
//   return { title: params };
// }

export default async function Tem({ params }: Props) {
  const data = await fetchTemtem({ names: [params.name] });

  return (
    <pre className="relative flex flex-col gap-8 min-h-full pb-8 overflow-x-hiddenzz">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

// export async function generateStaticParams() {
//   const posts = await fetchTems();
//   return posts.map((tem) => ({ name: tem.name, data: tem }));
// }
