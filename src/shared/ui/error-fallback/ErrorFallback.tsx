"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const errorFallbackVariants = cva(
  "flex flex-col items-center p-4 border border-gray-200 rounded-md shadow-md",
  {
    variants: {
      withIcon: {
        true: "h-full justify-center",
        false: "",
      },
    },
    defaultVariants: {
      withIcon: false,
    },
  }
);

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type ErrorFallbackProps = FallbackProps &
  VariantProps<typeof errorFallbackVariants> & {
    icon?: React.ReactNode;
    className?: string;
  };

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  icon,
  className,
  withIcon,
}: ErrorFallbackProps) {
  return (
    <section className={cn(errorFallbackVariants({ withIcon }), className)}>
      {icon && icon}
      <h2 className="text-2xl mb-3">이런! 문제가 발생했어요.</h2>
      <p>{error.message}</p>
      <p className="mb-3">아래 버튼을 클릭해 다시 시도해주세요.</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </section>
  );
}
