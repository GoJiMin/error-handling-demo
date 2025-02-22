import { photoQueryOptions } from "@/entities/photo";
import { PhotoList } from "@/features/photo";
import { getDehydratedInfiniteQuery } from "@/shared/lib/utils/react-query";
import { ErrorFallbackWithIcon } from "@/shared/ui/error-fallback";
import { RQProvider } from "@/shared/ui/react-query";

export default async function HomePage() {
  const { query } = await getDehydratedInfiniteQuery({
    query: photoQueryOptions.all(),
  });

  return (
    <section className="flex h-full items-center">
      <RQProvider state={query} ErrorFallback={ErrorFallbackWithIcon}>
        <PhotoList />
      </RQProvider>
    </section>
  );
}