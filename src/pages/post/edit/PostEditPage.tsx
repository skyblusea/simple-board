import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { withAsyncBoundary } from "@/components/hoc/withAsyncBoundary";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/pages/post/_component/PostForm";
import { PostFormSkeleton } from "@/pages/post/_component/PostFormSkeleton";
import { postQueries } from "@/services/post";
import type { PostFormData } from "@/services/post/types";

import { PostEditButton } from "./PostEditButton";

export function PageComponent() {
  const params = useParams();
  const id = params?.id;
  if (!id) throw new Error();

  const { data: post } = useSuspenseQuery(postQueries.detail(id));

  const methods = useForm<PostFormData>({
    defaultValues: {
      request: {
        title: post.title,
        content: post.content,
        category: post.boardCategory,
      },
      file: undefined,
    },
  });

  return (
    <FormProvider {...methods}>
      <Page title="게시글 수정" titleAction={<PostEditButton />} showBackButton={true}>
        <PostForm defPreview={post.imageUrl} />
      </Page>
    </FormProvider>
  );
}

export const PostEditPage = withAsyncBoundary(PageComponent, {
  onError: () => toast.error("기존 데이터를 불러오는데 실패하였습니다."),
  fallbackError: <Navigate to="/" />,
  fallbackLoading: (
    <Page
      title="게시글 수정"
      titleAction={
        <Button disabled className="px-4">
          수정
        </Button>
      }
      showBackButton={true}
    >
      <PostFormSkeleton />
    </Page>
  ),
});
