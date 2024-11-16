import { z } from "zod";
import { loginSchema, signupSchema } from "../schemas/schema";

// 로그인 입력 데이터 타입 정의
export type LoginFormValues = z.infer<typeof loginSchema>;

// 회원가입 입력 데이터 타입 정의
export type SignupFormValues = z.infer<typeof signupSchema>;
