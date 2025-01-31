import { Skeleton } from "@/shared/components/ui/skeleton";

export default function UserCardLoading() {
  return (
    <div className="flex items-center justify-center w-full gap-4 p-2 pb-5 border border-gray-200 shadow-md rounded-md">
      <Skeleton className="w-[120px] h-[120px] rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[120px] h-[25px]" />
        <Skeleton className="w-[80px] h-[15px]" />
        <Skeleton className="w-[130px] h-[20px]" />
      </div>
    </div>
  );
}
