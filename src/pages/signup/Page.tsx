import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signupSchema } from "./_schema";

export function SignupPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = handleSubmit((data) => {});

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
                    {errors.username && <FieldError>{errors.username.message}</FieldError>}
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
                    <FieldLabel htmlFor="passwordConfirm">비밀번호 확인</FieldLabel>
                    <Input
                      id="passwordConfirm"
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요."
                      {...register("passwordConfirm")}
                    />
                    {errors.passwordConfirm && (
                      <FieldError>{errors.passwordConfirm.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input id="name" placeholder="이름을 입력해주세요" {...register("name")} />
                    {errors.name && <FieldError>{errors.name.message}</FieldError>}
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
