import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../../schemas/schema";
import { useUserStore } from "../../../stores/store";
import { SignupFormValues } from "../../../types/type";
import { signup } from "../api/api";

const Signup = () => {
  const { accessToken } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (accessToken) {
      navigate(-2);
    }
  }, [accessToken, navigate]);

  const onSubmit = async (data: SignupFormValues) => {
    await signup(data);
    navigate("/login");
  };

  return (
    <SignupPageStyled>
      <h2>회원가입</h2>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">이메일</label>
          <input
            id="username"
            type="email"
            {...register("username")}
            placeholder="이메일을 입력하세요"
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="이름을 입력하세요"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="비밀번호를 다시 입력하세요"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>
        <button type="submit">회원가입</button>
      </FormStyled>
      <LoginLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </LoginLink>
    </SignupPageStyled>
  );
};

export default Signup;

// 스타일 정의
const SignupPageStyled = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const FormStyled = styled.form`
  .form-group {
    margin-bottom: 15px;
    text-align: left;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const LoginLink = styled.div`
  margin-top: 15px;
  font-size: 0.875rem;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
