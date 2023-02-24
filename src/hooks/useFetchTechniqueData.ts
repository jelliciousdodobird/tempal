import { useQuery } from "@tanstack/react-query";
import { fetchTechniqueData } from "../utils/fetch-technique-data";

export const useFetchTechniqueData = (
  name: string,
  staleTime = 60 * 60 * 1000
) => {
  const enableQuery = name !== "";

  const query = useQuery({
    queryKey: ["fetchTechniqueData", name],
    queryFn: () => fetchTechniqueData(name),
    enabled: enableQuery,
    staleTime,
  });

  return query;
};
