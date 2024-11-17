import { z } from "zod";
import { loginSchema, signupSchema } from "../schemas/schema";

// 로그인 입력 데이터 타입 정의
export type LoginFormValues = z.infer<typeof loginSchema>;

// 회원가입 입력 데이터 타입 정의
export type SignupFormValues = z.infer<typeof signupSchema>;

// 게시글 목록 타입 정의
export interface BoardListType {
  id: number;
  category: string;
  title: string;
  createdAt: string;
}

// 게시글 상세 타입 정의
export interface BoardDetailType {
  id: number;
  category: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}

// 게시글 작성/수정 타입 정의
export interface BoardWriteType {
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
}
