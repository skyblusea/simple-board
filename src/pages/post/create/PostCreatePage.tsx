import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postMutations, postQueries } from "@/services/post";
import type { PostFormData } from "@/services/post/types";

export function PostCreatePage() {
  const navigate = useNavigate();
  const { handleSubmit, register, setValue, control } = useForm<PostFormData>({
    mode: "onChange",
    defaultValues: {
      request: {
        title: "",
        content: "",
        category: "",
      },
      file: undefined,
    },
  });

  const { data: categories } = useSuspenseQuery(postQueries.categories());

  const { mutate: createPost, isPending } = useMutation({
    ...postMutations.create(),
    onMutate: () => {
      return { toastId: toast.loading("게시글 생성중...") };
    },
    onSuccess: (_, __, context) => {
      toast.success("게시글 생성에 성공하였습니다.", { id: context?.toastId });
      navigate(-1);
    },
    onError: (_, __, context) => {
      toast.error("게시글 생성에 실패하였습니다.", { id: context?.toastId });
    },
  });

  const onSubmit = handleSubmit((data) => {
    createPost(data);
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setValue("file", file, { shouldValidate: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveFile = () => {
    setValue("file", undefined);
    setPreview(null);
  };

  return (
    <Page
      title="게시글 작성"
      description="게시글을 작성해주세요."
      titleAction={
        <Button disabled={isPending} onClick={onSubmit} className="px-4">
          등록
        </Button>
      }
      showBackButton={true}
    >
      {/* 폼 */}
      <div className="flex flex-col gap-5 p-4">
        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="request.category"
            render={({ field, fieldState: { error } }) => (
              <Field>
                <FieldLabel htmlFor="request.category">카테고리</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="카테고리를 선택하세요">
                      {field.value ? categories[field.value] : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{error?.message}</FieldError>
              </Field>
            )}
          />
        </div>

        {/* 제목 입력 */}
        <Field>
          <FieldLabel htmlFor="request.title">제목</FieldLabel>
          <Input
            {...register("request.title", { required: true })}
            placeholder="제목을 입력하세요"
            className="text-base"
          />
        </Field>

        {/* 내용 입력 */}
        <Field>
          <FieldLabel htmlFor="request.content">내용</FieldLabel>
          <Textarea
            {...register("request.content", { required: true })}
            placeholder="내용을 입력하세요"
            className="min-h-[240px] resize-none text-base"
          />
        </Field>

        {/* 첨부파일 */}
        <Field>
          <FieldLabel>이미지 첨부</FieldLabel>
          <div>
            {preview && (
              <div className="group relative aspect-square w-20 overflow-hidden rounded-md">
                <img src={preview} alt="preview-img" className="size-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button type="button" onClick={handleRemoveFile} className="text-white">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )}
            {!preview && (
              <label className="border-border bg-muted flex aspect-square w-20 cursor-pointer items-center justify-center rounded-md border border-dashed">
                <Plus className="size-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </Field>
      </div>
    </Page>
  );
}
