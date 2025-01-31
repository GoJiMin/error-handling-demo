import { Skeleton } from "@/shared/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex justify-between gap-4 border-2 border-gray-200 shadow-md rounded-md">
      <div className="flex flex-col p-3">
        <Skeleton className="h-[35px] w-[300px] mb-1" />
        <Skeleton className="h-4 w-[150px] mb-5" />
        <Skeleton className="h-[150px] w-[270px]" />
      </div>
      <Skeleton className="h-[300px] w-[500px] " />
    </div>
  );
};

export default function ProductsLoading() {
  return (
    <ul className="flex flex-col gap-5 h-full">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </ul>
  );
}
