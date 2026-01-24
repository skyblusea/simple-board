import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router";

import { toast } from "sonner";

import { withAsyncBoundary } from "@/components/hoc/withAsyncBoundary";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/pages/post/_component/PostForm";
import type { PostFormData } from "@/services/post/types";

import { PostFormSkeleton } from "../_component/PostFormSkeleton";
import { PostCreateButton } from "./PostCreateButton";

export function PageComponent() {
  const methods = useForm<PostFormData>({
    defaultValues: {
      request: {
        title: "",
        content: "",
        category: "",
      },
      file: undefined,
    },
  });

  return (
    <FormProvider {...methods}>
      <Page title="게시글 작성" titleAction={<PostCreateButton />} showBackButton={true}>
        <PostForm />
      </Page>
    </FormProvider>
  );
}

export const PostCreatePage = withAsyncBoundary(PageComponent, {
  onError: () => toast.error("카테고리를 불러오는데 실패하였습니다."),
  fallbackError: <Navigate to="/" />,
  fallbackLoading: (
    <Page
      title="게시글 생성"
      titleAction={
        <Button disabled className="px-4">
          생성
        </Button>
      }
      showBackButton={true}
    >
      <PostFormSkeleton />
    </Page>
  ),
});
