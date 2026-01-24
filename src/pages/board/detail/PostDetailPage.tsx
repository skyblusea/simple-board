"use client";

import { Navigate, useNavigate, useParams } from "react-router";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

import { withAsyncBoundary } from "@/components/hoc/withAsyncBoundary";
import { Page } from "@/components/layout/Page";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { PostActions } from "@/components/ui/post-actions";
import { Typography } from "@/components/ui/typography";
import { BOARD_ROOT_KEY, boardQueries, mutations } from "@/services/board";

import { PageSkeleton } from "./PageSkeleton";

function PageComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  if (!id) throw new Error();

  const queryClient = useQueryClient();

  const { data: post } = useSuspenseQuery(boardQueries.detail(id));

  const deleteMutation = useMutation({
    ...mutations.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOARD_ROOT_KEY] });
      navigate("/");
    },
  });

  const handleEdit = () => navigate(`/edit/${id}`);
  const handleDelete = () => {
    toast.promise(deleteMutation.mutateAsync(), {
      loading: "삭제 중...",
      success: "게시글이 삭제되었습니다.",
      error: "게시글 삭제에 실패했습니다.",
    });
  };

  return (
    <Page
      showBackButton={true}
      backTo="/"
      titleAction={<PostActions onDelete={handleDelete} onEdit={handleEdit} />}
    >
      {/* 게시글 정보 */}
      <div className="border-border border-b px-4 py-6">
        <Badge variant="secondary">{post.boardCategory}</Badge>
        <Typography variant="title3" as="h1" className="mb-4 leading-relaxed">
          {post.title}
        </Typography>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Typography variant="caption1" className="text-muted-foreground">
              {dayjs(post.createdAt).format("YYYY.MM.DD")}
            </Typography>
          </div>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="border-border border-b px-4 py-6">
        {post.imageUrl && <LazyImage src={post.imageUrl} alt="post-image" />}
        <Typography variant="body1Reading" className="whitespace-pre-wrap">
          {post.content}
        </Typography>
      </div>

      {/* 목록 버튼 */}
      <LinkButton to="/" variant="outline" className="w-full bg-transparent">
        목록으로
      </LinkButton>
    </Page>
  );
}

export const PostDetailPage = withAsyncBoundary(PageComponent, {
  onError: () => toast.error("게시글을 불러오는데 실패하였습니다."),
  fallbackError: <Navigate to="/" />,
  fallbackLoading: <PageSkeleton />,
});
