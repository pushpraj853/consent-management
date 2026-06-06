import { Skeleton } from "@/components/ui/skeleton";

const ConsentGrantSkeleton = () => (
  <div className="w-full max-w-xl">
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <div className="border-b border-border/60 bg-muted/20 px-6 py-8 sm:px-10">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-14 rounded-2xl sm:size-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-14 rounded-2xl sm:size-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-8 sm:px-10">
        <div className="space-y-2">
          <Skeleton className="mx-auto h-7 w-4/5 sm:mx-0" />
          <Skeleton className="mx-auto h-4 w-3/5 sm:mx-0" />
        </div>

        <div className="space-y-3 rounded-xl border border-border/60 bg-muted/15 p-4 sm:p-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>

        <Skeleton className="h-16 w-full rounded-lg" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Skeleton className="h-10 w-full rounded-lg sm:w-24" />
          <Skeleton className="h-10 w-full rounded-lg sm:w-24" />
        </div>
      </div>
    </div>
  </div>
);

export default ConsentGrantSkeleton;
