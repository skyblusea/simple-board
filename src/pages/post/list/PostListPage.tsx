import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ChevronRight, Loader2, PenSquare, StickyNote } from "lucide-react";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { boardQueries } from "@/services/post";

export function PostListPage() {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    boardQueries.infiniteList(),
  );
  const posts = data?.pages.flatMap((ele) => ele.content);

  const handleCreateClick = () => {
    navigate("/new");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <Page
      title="게시글 목록"
      titleAction={
        <Button onClick={handleCreateClick}>
          <PenSquare className="mr-2 h-4 w-4" />
          글쓰기
        </Button>
      }
    >
      {/* 게시판 목록 */}
      <div className="divide-border divide-y">
        {posts?.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}`}
            className="hover:bg-muted/50 flex cursor-pointer items-center justify-between px-4 py-5 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Typography variant="body1Normal">{item.title}</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="caption1" className="text-muted-foreground">
                  {item.category}
                </Typography>
                <Typography variant="caption1" className="text-muted-foreground">
                  ·
                </Typography>
                <Typography variant="caption1" className="text-muted-foreground">
                  {dayjs(item.createdAt).format("YYYY.MM.DD")}
                </Typography>
              </div>
            </div>
            <ChevronRight className="text-muted-foreground h-5 w-5 flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* 목록 상태 */}
      <div ref={observerRef} className="flex items-center justify-center py-8">
        {/* 초기 로딩 */}
        {isLoading && (
          <div className="text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <Typography variant="caption1" className="text-muted-foreground">
              불러오는 중...
            </Typography>
          </div>
        )}

        {/* 빈 상태 - 로딩 완료 후 데이터 없음 */}
        {!isLoading && !isFetching && posts?.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-24">
            <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <StickyNote className="text-muted-foreground h-8 w-8" />
            </div>
            <Typography variant="caption1" className="text-muted-foreground mb-2">
              등록된 게시글이 없습니다
            </Typography>
          </div>
        )}

        {/* 추가 페이지 로딩 중 */}
        {!isLoading && isFetching && (
          <div className="text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {/* 모든 데이터 로드 완료 */}
        {!isFetching && posts && posts.length > 0 && !hasNextPage && (
          <Typography variant="caption1" className="text-muted-foreground">
            모든 게시글을 불러왔습니다.
          </Typography>
        )}
      </div>
    </Page>
  );
}
