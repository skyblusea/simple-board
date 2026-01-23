import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/hooks";

import { type SignupFormData, signupSchema } from "./_schema";

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = handleSubmit(async (data) => {
    try {
      await signup(data);
      toast.success("회원가입에 성공했습니다.");
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        let message = "회원가입에 실패했습니다.\n";
        const errorData = error.response?.data;
        if (errorData instanceof Object) {
          message += Object.values(errorData)
            .flatMap((value) => (typeof value === "string" ? [value] : value))
            .join("\n");
        }
        toast.error(message);
      }
    }
  });

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSignup}>
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">이메일 아이디</FieldLabel>
                    <Input
                      id="username"
                      placeholder="이메일 아이디를 입력해주세요."
                      {...register("username")}
                    />
                    <FieldError>{errors.username?.message}</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="영문, 숫자, 특수문자(!%*#?&) 조합 8자 이상"
                      {...register("password")}
                    />
                    {errors.password && <FieldError>{errors.password.message}</FieldError>}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">비밀번호 확인</FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요."
                      {...register("confirmPassword")}
                    />
                    <FieldError>{errors.confirmPassword?.message}</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input id="name" placeholder="이름을 입력해주세요" {...register("name")} />
                    <FieldError>{errors.name?.message}</FieldError>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-7 flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              회원가입
            </Button>
            <div className="text-muted-foreground flex items-center justify-center text-center text-sm">
              이미 계정이 있으신가요?
              <LinkButton variant="link" type="button" to="/login">
                로그인
              </LinkButton>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
