import { useFormContext } from "react-hook-form";

import type { PostFormData } from "@/services/post/types";

export const usePostFormContext = () => {
  return useFormContext<PostFormData>();
};
