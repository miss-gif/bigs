import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessageStyled } from "../../../css/ErrorMessageStyled";
import { FormStyled } from "../../../css/FormStyled";
import { loginSchema } from "../../../schemas/schema";
import { LoginFormValues } from "../../../types/type";
import useProtectedRoute from "../../board/hooks/useProtectedRoute";
import { FooterLink } from "../components/FooterLink";
import PageWrapper from "../components/PageWrapper";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { handleSignin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await handleSignin(data);
  };

  // 로그인 상태에서는 로그인 페이지로 이동할 수 없도록 설정
  useProtectedRoute();

  return (
    <PageWrapper title="로그인">
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>이메일 입력</legend>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            {...register("username")}
            placeholder="이메일을 입력하세요"
          />
          {errors.username && (
            <ErrorMessageStyled>{errors.username.message}</ErrorMessageStyled>
          )}
        </fieldset>
        <fieldset>
          <legend>비밀번호 입력</legend>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="password"
            {...register("password")}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <ErrorMessageStyled>{errors.password.message}</ErrorMessageStyled>
          )}
        </fieldset>
        <button type="submit">로그인</button>
      </FormStyled>
      <FooterLink>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </FooterLink>
    </PageWrapper>
  );
};

export default Login;
