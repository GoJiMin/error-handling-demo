import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function PhotoCardLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <Skeleton className="w-[400px] h-[25px]" />
        <Skeleton className="w-[590px] h-[55px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-[600px] h-[300px] rounded-lg" />
      </CardContent>
    </Card>
  );
}
