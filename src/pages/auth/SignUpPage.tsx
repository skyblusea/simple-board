import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form>
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">이메일 아이디</FieldLabel>
                    <Input id="username" placeholder="이메일 아이디를 입력해주세요." required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      id="password"
                      placeholder="영문, 숫자, 특수문자(!%*#?&) 조합 8자 이상"
                      type="password"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호 확인</FieldLabel>
                    <Input
                      id="password"
                      placeholder="비밀번호를 다시 입력해주세요."
                      type="password"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">이름</FieldLabel>
                    <Input placeholder="이름를 입력해주세요." type="password" required />
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
