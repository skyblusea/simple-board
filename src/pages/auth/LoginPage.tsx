import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginPage() {
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
                      placeholder="비밀번호를 입력해주세요."
                      type="password"
                      required
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-7 flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              로그인
            </Button>
            <div className="text-muted-foreground flex items-center justify-center text-center text-sm">
              아직 회원이 아니신가요?
              <LinkButton variant="link" type="button" to="/signup">
                회원가입
              </LinkButton>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
