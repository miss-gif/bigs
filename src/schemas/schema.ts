import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});
