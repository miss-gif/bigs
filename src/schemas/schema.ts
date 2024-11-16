import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const signupSchema = z
  .object({
    username: z.string().email("유효한 이메일 주소를 입력해주세요."),
    name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!%*#?&])[A-Za-z0-9!%*#?&]+$/,
        "비밀번호는 영문자, 숫자, 특수문자(!%*#?&)를 포함해야 합니다."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
