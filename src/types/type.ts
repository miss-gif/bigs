import { z } from "zod";
import { loginSchema } from "../schemas/schema";

// 입력 데이터 타입 정의
export type LoginFormValues = z.infer<typeof loginSchema>;
