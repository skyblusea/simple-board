import { useState } from "react";
import { Controller } from "react-hook-form";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";

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
import { postQueries } from "@/services/post";

import { usePostFormContext } from "../_hooks/usePostFormContext";

export function PostForm() {
  const { register, setValue, control } = usePostFormContext();

  const { data: categories } = useSuspenseQuery(postQueries.categories());

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
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>
      </Field>
    </div>
  );
}
