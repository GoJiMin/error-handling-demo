import {
  defaultShouldDehydrateQuery,
  dehydrate,
  QueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

import { cache } from "react";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
          gcTime: 0,
        },
        dehydrate: {
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending",
        },
      },
    })
);

type QueryProps<ResponseType = unknown> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<ResponseType>;
};

type DehydratedQueryProps<Q> = {
  query: Q;
  useSuspense?: boolean;
};

type DehydratedQueriesProps<Q> = {
  queries: Q;
  useSuspense?: boolean;
};

export async function getDehydratedQuery<Q extends QueryProps>({
  query,
  useSuspense,
}: DehydratedQueryProps<Q>) {
  const queryClient = getQueryClient();

  if (useSuspense) {
    queryClient.prefetchQuery(query);
  } else {
    await queryClient.prefetchQuery(query);
  }

  return { query: dehydrate(queryClient).queries };
}

export async function getDehydratedQueries<Q extends QueryProps[]>({
  queries,
  useSuspense = false,
}: DehydratedQueriesProps<Q>) {
  const queryClient = getQueryClient();
  const promises = queries.map((query) => queryClient.prefetchQuery(query));

  if (!useSuspense) {
    await Promise.all(promises);
  }

  return { queries: dehydrate(queryClient).queries };
}
