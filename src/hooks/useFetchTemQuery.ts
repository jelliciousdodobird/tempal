import { useQuery } from "@tanstack/react-query";
import { fetchTemtem } from "../utils/fetch";

export const useFetchTemQuery = (name: string, staleTime = 60 * 60 * 1000) => {
  const enableQuery = name !== "";
  const query = useQuery({
    queryKey: ["fetchTemtem", name],
    queryFn: () => fetchTemtem({ names: [name] }),
    enabled: enableQuery,
    staleTime,
  });

  return query;
};
