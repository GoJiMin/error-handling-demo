"use client";

import { FallbackProps } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { LucideIcon } from "../icons";

type WithErrorFallbackProps = {
  withIcon?: boolean;
  icon?: React.ReactNode;
};

const withErrorFallback = ({
  withIcon = false,
  icon = null,
}: WithErrorFallbackProps) => {
  const WithErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <ErrorFallback
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      withIcon={withIcon}
      icon={icon}
    />
  );

  return WithErrorFallback;
};

export const ErrorFallbackWithoutIcon = withErrorFallback({ withIcon: false });
export const ErrorFallbackWithIcon = withErrorFallback({
  withIcon: true,
  icon: <LucideIcon name="Bomb" size={85} className="mb-4" />,
});
