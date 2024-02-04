import { Skeleton } from "./ui/skeleton";

function SkeletonProfile() {
  return (
    <div className="flex  flex-col gap-2 p-4 rounded-lg items-start">
      <Skeleton className="h-32 w-32 rounded-full mb-8" />
      <Skeleton className="h-10 w-60 my-4" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-20" />
      </div>
      <Skeleton className="h-10 w-64 my-8" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}

export default SkeletonProfile
