import { z } from "zod";

export const loginSchema = z.object({
  username: z.email("올바른 이메일 형식이 아닙니다.").min(1, "이메일 아이디를 입력해주세요."),
  password: z
    .string("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!%*#?&])/,
      "영문, 숫자, 특수문자(!%*#?&)를 포함해야 합니다.",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
