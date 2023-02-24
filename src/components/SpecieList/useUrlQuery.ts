"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchQuery } from "./SpecieList.types";
import {
  cleanQuery,
  getMinimalQuery,
  getMinimalQueryString,
  getQuery,
  minimalQueryToUrl,
} from "./SpecieList.utils";

export type UrlOption = {
  href?: string;
  query?: Partial<SearchQuery>;
  updateType?: "push" | "replace";
};

export const useUrlQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = getQuery(params);
  const minimalQuery = getMinimalQuery(query);
  const minimalQueryUrl = minimalQueryToUrl(minimalQuery);

  const updateQueryUrl = (options: UrlOption) => {
    const optQuery = options.query ?? {};
    const optHref = options.href ?? pathname ?? "";
    const optUpdateType = options.updateType ?? "push";

    const searchQuery = cleanQuery({ ...query, ...optQuery });
    const minQuery = getMinimalQueryString(searchQuery);

    if (optUpdateType === "push") router.push(optHref + minQuery);
    else if (optUpdateType === "replace") router.replace(optHref + minQuery);
  };

  return { query, minimalQuery, minimalQueryUrl, updateQueryUrl };
};
