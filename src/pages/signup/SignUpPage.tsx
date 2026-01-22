import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignUpPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.validity.patternMismatch) {
      input.setCustomValidity("비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">이메일 아이디</FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      type="email"
                      placeholder="이메일 아이디를 입력해주세요."
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="영문, 숫자, 특수문자(!%*#?&) 조합 8자 이상"
                      pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!%*#?&]).+$"
                      minLength={8}
                      onInvalid={handleInvalid}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="passwordConfirm">비밀번호 확인</FieldLabel>
                    <Input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요."
                      pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!%*#?&]).+$"
                      minLength={8}
                      onInvalid={handleInvalid}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      placeholder="이름을 입력해주세요."
                      type="text"
                      required
                    />
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
