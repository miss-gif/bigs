import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessageStyled } from "../../../css/ErrorMessageStyled";
import { FormStyled } from "../../../css/FormStyled";
import { signupSchema } from "../../../schemas/schema";
import { SignupFormValues } from "../../../types/type";
import useProtectedRoute from "../../board/hooks/useProtectedRoute";
import { signup } from "../api/api";
import { FooterLink } from "../components/FooterLink";
import PageWrapper from "../components/PageWrapper";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    await signup(data);
    navigate("/login");
  };

  // 로그인 상태에서는 로그인 페이지로 이동할 수 없도록 설정
  useProtectedRoute();

  return (
    <PageWrapper title="회원가입">
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>이메일 입력</legend>
          <label htmlFor="username">이메일</label>
          <input
            id="username"
            type="email"
            {...register("username")}
            placeholder="이메일을 입력하세요"
          />
          {errors.username && (
            <ErrorMessageStyled>{errors.username.message}</ErrorMessageStyled>
          )}
        </fieldset>
        <fieldset>
          <legend>이름 입력</legend>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register("name")}
            placeholder="이름을 입력하세요"
          />
          {errors.name && (
            <ErrorMessageStyled>{errors.name.message}</ErrorMessageStyled>
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
        <fieldset>
          <legend>비밀번호 확인 입력</legend>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            placeholder="비밀번호를 다시 입력하세요"
          />
          {errors.confirmPassword && (
            <ErrorMessageStyled>
              {errors.confirmPassword.message}
            </ErrorMessageStyled>
          )}
        </fieldset>
        <button type="submit">회원가입</button>
      </FormStyled>
      <FooterLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </FooterLink>
    </PageWrapper>
  );
};

export default Signup;
