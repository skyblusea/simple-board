import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { postMutations } from "@/services/post";

import { usePostFormContext } from "../_hooks/usePostFormContext";

export function PostCreateButton() {
  const navigate = useNavigate();
  const { handleSubmit } = usePostFormContext();

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

  const handleButtonClick = handleSubmit((data) => {
    createPost(data);
  });

  return (
    <Button disabled={isPending} onClick={handleButtonClick} className="px-4">
      등록
    </Button>
  );
}
