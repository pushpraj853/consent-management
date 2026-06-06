import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MyConsentsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-12" />
          </CardHeader>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <div className="flex flex-col gap-3 px-4 pb-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </Card>
  </div>
);

export default MyConsentsSkeleton;
