import { Skeleton } from "@/components/ui/skeleton";

export function PostFormSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* 카테고리 선택 */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>

      {/* 제목 입력 */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-9 w-full" />
      </div>

      {/* 내용 입력 */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-[240px] w-full" />
      </div>

      {/* 첨부파일 */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="aspect-square w-20 rounded-md" />
      </div>
    </div>
  );
}
