import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <Page showBackButton={true} backTo="/" titleAction={<Skeleton className="size-10" />}>
      {/* 게시글 정보 */}
      <div className="border-border border-b px-4 py-6">
        <Skeleton className="mb-2 h-5 w-16" />
        <Skeleton className="mb-4 h-7 w-3/4" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* 게시글 본문 */}
      <div className="border-border space-y-3 border-b px-4 py-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* 하단 네비게이션 */}
      <div className="px-4 py-4">
        <div className="divide-border flex flex-col divide-y">
          <div className="flex items-center gap-3 py-3">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3 py-3">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* 목록 버튼 */}
      <Button variant="outline" className="w-full bg-transparent">
        목록으로
      </Button>
    </Page>
  );
}
