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

    <section className="flex flex-col gap-3 md:hidden">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="gap-0 py-0 [--card-spacing:--spacing(4)]">
          <div className="flex flex-col gap-3 px-4 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        </Card>
      ))}
    </section>

    <Card className="hidden md:block">
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
