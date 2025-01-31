"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  RequestError,
  RequestGetError,
  useUpdateAppError,
} from "@/entities/errors";

const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const updateError = useUpdateAppError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: (error: Error) => {
          if (
            error instanceof RequestGetError &&
            error.errorHandlingStrategy === "errorBoundary"
          ) {
            return true;
          }

          return false;
        },
        staleTime: 0,
        gcTime: 0,

        refetchOnWindowFocus: false,

        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        if (
          error instanceof RequestGetError &&
          error.errorHandlingStrategy === "errorBoundary"
        )
          return;
        if (error instanceof RequestError) updateError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        if (error instanceof RequestError) updateError(error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientBoundary;
