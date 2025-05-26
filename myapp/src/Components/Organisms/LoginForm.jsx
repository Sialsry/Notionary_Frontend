import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FormField from "../Molecules/FormField";
import Button from "../Atoms/ming/SignupButton";
import { Title, Text, ErrorText } from "../Atoms/ming/Typography";
import { loginUser } from "../api/authApi";

const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 35px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const ForgotPasswordLink = styled.a`
  text-align: right;
  margin-top: 10px;
  color: #7e57c2;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #555;
  cursor: pointer;
`;

const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: #999;
  font-size: 14px;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }

  &:before {
    margin-right: 10px;
  }

  &:after {
    margin-left: 10px;
  }
`;

const SignupPrompt = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

const SignupLink = styled.a`
  color: #7e57c2;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    uid: "",
    upw: "",
  });
  //   const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }

    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.uid.trim()) {
      errors.uid = "아이디를 입력해주세요";
    }

    if (!formData.upw) {
      errors.upw = "비밀번호를 입력해주세요";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setGeneralError("");

    try {
      // Login API call
      const response = await loginUser(formData);
      console.log("로그인 API 정보!!:", response);

      // If login successful and we have a token, redirect to main page
      if (response.success && response.token) {
        // Redirect to main page or dashboard
        window.location.href = "/main";
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data) {
        setGeneralError(
          error.response.data.message || "로그인에 실패했습니다."
        );
      } else {
        setGeneralError(
          "서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Title style={{ fontSize: "2rem", marginBottom: "15px" }}>로그인</Title>
      <Text
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "0.95rem",
        }}
      >
        Notionary에 오신 것을 환영합니다!
      </Text>

      {generalError && (
        <ErrorText style={{ textAlign: "center", marginBottom: "15px" }}>
          {generalError}
        </ErrorText>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField
          label="아이디"
          id="uid"
          name="uid"
          type="text"
          placeholder="아이디를 입력하세요"
          value={formData.uid}
          onChange={handleChange}
          error={formErrors.uid}
        />

        <FormField
          label="비밀번호"
          id="upw"
          name="upw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.upw}
          onChange={handleChange}
          error={formErrors.upw}
        />

        {/* <ForgotPasswordLink href="/forgot-password">
          비밀번호를 잊으셨나요?
        </ForgotPasswordLink> */}

        {/* <RememberMeContainer>
          <Checkbox
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <CheckboxLabel htmlFor="rememberMe">로그인 상태 유지</CheckboxLabel>
        </RememberMeContainer> */}

        <ButtonContainer>
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "기존 회원 로그인"}
          </Button>
        </ButtonContainer>
      </Form>

      <OrSeparator>또는</OrSeparator>

      {/* 카카오 로그인 버튼 */}
      <Button
        type="button"
        secondary
        fullWidth
        onClick={() =>
          (window.location.href = "http://localhost:4000/kakao/login")
        }
        style={{
          backgroundColor: "#FEE500",
          color: "#000",
          border: "none",
        }}
      >
        카카오 계정으로 로그인
      </Button>

      <SignupPrompt>
        계정이 없으신가요?
        <SignupLink href="/signup">회원가입</SignupLink>
      </SignupPrompt>
    </FormContainer>
  );
};

export default LoginForm;
