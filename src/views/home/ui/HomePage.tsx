import { photoQueryOptions } from "@/entities/photo";
import { PhotoList } from "@/features/photo";
import { getDehydratedQuery } from "@/shared/lib/utils/react-query";
import { ErrorFallbackWithIcon } from "@/shared/ui/error-fallback";
import { RQProvider } from "@/shared/ui/react-query";

export default async function HomePage() {
  const { query } = await getDehydratedQuery({
    query: photoQueryOptions.all(),
  });

  return (
    <section className="flex h-full items-center">
      <RQProvider ErrorFallback={ErrorFallbackWithIcon} state={query}>
        <PhotoList />
      </RQProvider>
    </section>
  );
}
