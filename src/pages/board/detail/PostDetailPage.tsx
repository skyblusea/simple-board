"use client";

import { useNavigate, useParams } from "react-router";

import dayjs from "dayjs";

import { Page } from "@/components/layout/Page";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { PostActions } from "@/components/ui/post-actions";
import { Typography } from "@/components/ui/typography";

import { PostNavigation } from "./_components/PostNavigation";
import { mock } from "./mock";

export function PostDetailPage() {
  const post = mock;
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const handleEdit = () => navigate(`/edit/${id}`);

  return (
    <Page
      showBackButton={true}
      backTo="/"
      titleAction={<PostActions onDelete={() => {}} onEdit={handleEdit} />}
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
        {post.imageUrl && <img className="mb-4 w-full" src={post.imageUrl} />}
        <Typography variant="body1Reading" className="whitespace-pre-wrap">
          {post.content}
        </Typography>
      </div>

      {/* 하단 네비게이션 */}
      <div className="px-4 py-4">
        <div className="divide-border flex flex-col divide-y">
          <PostNavigation to="/2" type="prev" title="서비스 정기 점검 안내" />
          <PostNavigation to="/3" type="next" title="봄맞이 이벤트 진행 중" />
        </div>
      </div>

      {/* 목록 버튼 */}
      <LinkButton to="/" variant="outline" className="w-full bg-transparent">
        목록으로
      </LinkButton>
    </Page>
  );
}
