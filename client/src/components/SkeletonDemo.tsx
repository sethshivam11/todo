import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex  flex-col gap-2 p-4 rounded-lg items-start ring-1 ring-gray-100/25">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-6 w-[250px] m-0" />
    </div>
  );
}
