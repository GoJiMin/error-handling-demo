import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductList, ProductListLoading } from "@/features/products";
import { UserCard, UserCardLoading } from "@/features/user";
import {
  ErrorFallbackWithIcon,
  ErrorFallbackWithoutIcon,
} from "@/shared/ui/error-fallback";

export default function ProductsPage() {
  return (
    <section className="h-full p-4 flex flex-col gap-4">
      <ErrorBoundary FallbackComponent={ErrorFallbackWithoutIcon}>
        <Suspense fallback={<UserCardLoading />}>
          <UserCard />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallbackWithIcon}>
        <Suspense fallback={<ProductListLoading />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
