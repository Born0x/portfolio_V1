import { Skeleton } from "@/components/ui/skeleton";

export function MediaCardSkeleton() {
  return (
    <div className="group relative">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
