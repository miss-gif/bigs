import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../schemas/schema";
import { LoginFormValues } from "../../../types/type";
import { signin } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await signin(data);
    navigate("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LoginPageStyled>
      <h2>로그인</h2>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            {...register("username")}
            placeholder="이메일을 입력하세요"
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            autoComplete="password"
            {...register("password")}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <button type="submit">로그인</button>
      </FormStyled>
      <SignUpLink>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </SignUpLink>
    </LoginPageStyled>
  );
};

export default Login;

const LoginPageStyled = styled.div`
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

const SignUpLink = styled.div`
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
