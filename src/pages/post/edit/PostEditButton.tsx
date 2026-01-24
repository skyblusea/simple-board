import { useNavigate, useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { POST_ROOT_KEY, postMutations } from "@/services/post";

import { usePostFormContext } from "../_hooks/usePostFormContext";

export function PostEditButton() {
  const params = useParams();
  const id = params.id;
  if (!id) throw new Error();

  const navigate = useNavigate();
  const { handleSubmit } = usePostFormContext();
  const queryClient = useQueryClient();

  const { mutate: editPost, isPending } = useMutation({
    ...postMutations.edit(id),
    onMutate: () => {
      return { toastId: toast.loading("게시글 수정중...") };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: [POST_ROOT_KEY] });
      toast.success("게시글 수정에 성공하였습니다.", { id: context?.toastId });
      navigate(`/${id}`);
    },
    onError: (_, __, context) => {
      toast.error("게시글 수정에 실패하였습니다.", { id: context?.toastId });
    },
  });

  const handleButtonClick = handleSubmit((data) => {
    editPost(data);
  });

  return (
    <Button disabled={isPending} onClick={handleButtonClick} className="px-4">
      수정
    </Button>
  );
}
