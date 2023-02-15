import { fetchTemtem } from "../../../../utils/fetch";

type SpecieParam = {
  names: string[];
};

type Props = {
  params: SpecieParam;
};

export default async function CompareTems({ params }: Props) {
  const data = await fetchTemtem({ names: params.names });

  return (
    <pre className="relative flex flex-col gap-8 min-h-full pb-8">
      {JSON.stringify(params, null, 2)}
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
