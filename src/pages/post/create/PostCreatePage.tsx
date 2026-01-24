import { FormProvider, useForm } from "react-hook-form";

import { Page } from "@/components/layout/Page";
import { PostForm } from "@/pages/post/_component/PostForm";
import type { PostFormData } from "@/services/post/types";

import { PostCreateButton } from "./PostCreateButton";

export function PostCreatePage() {
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
      <Page
        title="게시글 작성"
        description="게시글을 작성해주세요."
        titleAction={<PostCreateButton />}
        showBackButton={true}
      >
        <PostForm />
      </Page>
    </FormProvider>
  );
}
