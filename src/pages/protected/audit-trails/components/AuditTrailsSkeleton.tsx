import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const AuditTrailsSkeleton = () => (
  <Card className="[--card-spacing:--spacing(0)]">
    <CardContent className="px-0 pb-0 pt-2">
      <div className="flex flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex w-full gap-5 px-6">
            <Skeleton className="mt-5 size-3 shrink-0 rounded-full" />
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col gap-2 pt-4",
                index < 3 && "border-b border-border/50 pb-4",
                index === 3 && "pb-4",
              )}
            >
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-4 w-full max-w-lg" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default AuditTrailsSkeleton;
