"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ComponentType, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ErrorFallbackWithoutIcon } from "@/shared/ui/error-fallback";
import { LoadingSpinner } from "@/shared/ui/spinners";

type DefaultProps = {
  state?: DehydratedState["queries"];
  children: React.ReactNode;
  ErrorFallback?: ComponentType<FallbackProps>;
  LoadingFallback?: React.ReactNode;
};

export default function RQProvider({
  state,
  children,
  ErrorFallback = ErrorFallbackWithoutIcon,
  LoadingFallback = <LoadingSpinner />,
}: DefaultProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={LoadingFallback}>
            {state ? (
              <HydrationBoundary state={{ queries: state }}>
                {children}
              </HydrationBoundary>
            ) : (
              children
            )}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
