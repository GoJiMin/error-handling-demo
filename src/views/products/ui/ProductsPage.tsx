import { userQueryOptions } from "@/entities/user";
import { productsQueryOptions } from "@/entities/products";
import { UserCard, UserCardLoading } from "@/features/user";
import { ProductList, ProductListLoading } from "@/features/products";
import { RQProvider } from "@/shared/ui/react-query";
import { ErrorFallbackWithIcon } from "@/shared/ui/error-fallback";
import { getDehydratedQueries } from "@/shared/lib/utils/react-query";

export default async function ProductsPage() {
  const { queries } = await getDehydratedQueries({
    queries: [userQueryOptions.all("253"), productsQueryOptions.all()],
  });

  return (
    <section className="h-full p-4 flex flex-col gap-4">
      <RQProvider state={queries} LoadingFallback={<UserCardLoading />}>
        <UserCard />
      </RQProvider>
      <RQProvider
        state={queries}
        LoadingFallback={<ProductListLoading />}
        ErrorFallback={ErrorFallbackWithIcon}
      >
        <ProductList />
      </RQProvider>
    </section>
  );
}
