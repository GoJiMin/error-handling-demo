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
import { useState } from "react";

const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const updateError = useUpdateAppError();

  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: (error: Error) =>
            error instanceof RequestGetError &&
            error.errorHandlingStrategy === "errorBoundary",

          staleTime: 1000 * 60 * 3, // 3 minute
          gcTime: 1000 * 60 * 3, // 3 minute

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
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientBoundary;
