import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormField from "../Molecules/FormField";
import DaumAddressField from "../Molecules/DaumAddressField";
import Button from "../Atoms/ming/SignupButton";
import { Title, Subtitle, Text } from "../Atoms/ming/Typography";
import { validateForm, validateField } from "../utils/validation";
import { registerUser, checkIdDuplicate } from "../api/authApi";

const FormContainer = styled.div`
  width: 500px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const IdCheckSuccess = styled.div`
  color: #4caf50;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:before {
    content: "✓";
    margin-right: 5px;
    font-weight: bold;
  }
`;

const SignupForm = () => {
  const initialState = {
    uid: "",
    upw: "",
    confirmPw: "",
    nick: "",
    gender: "",
    phone: "",
    dob: "",
    addr: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [showIdSuccess, setShowIdSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear ID validation if UID changes
    if (name === "uid") {
      setIsIdValid(false);
      setShowIdSuccess(false);
    }

    // Validate field on change for immediate feedback
    const error = validateField(name, value, formData);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleIdCheck = async () => {
    if (!formData.uid) {
      setFormErrors({
        ...formErrors,
        uid: "아이디를 입력해주세요.",
      });
      return;
    }

    const error = validateField("uid", formData.uid);
    if (error) {
      setFormErrors({
        ...formErrors,
        uid: error,
      });
      setShowIdSuccess(false);
      return;
    }

    setIsCheckingId(true);
    try {
      const response = await checkIdDuplicate(formData.uid);
      if (response.isAvailable) {
        setIsIdValid(true);
        setShowIdSuccess(true);
        setFormErrors({
          ...formErrors,
          uid: null,
        });
      } else {
        setIsIdValid(false);
        setShowIdSuccess(false);
        setFormErrors({
          ...formErrors,
          uid: "이미 사용중인 아이디입니다.",
        });
      }
    } catch (error) {
      console.error("ID check error:", error);
      setShowIdSuccess(false);
      setFormErrors({
        ...formErrors,
        uid: "아이디 중복확인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsCheckingId(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = validateForm(formData);
    setFormErrors(errors);

    // Check if there are any errors
    if (Object.keys(errors).length > 0 || !isIdValid) {
      if (!isIdValid) {
        setFormErrors({
          ...errors,
          uid: "아이디 중복확인이 필요합니다.",
        });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      // Send registration request to backend
      const { confirmPw, ...userData } = formData;
      const response = await registerUser(userData);

      // Handle successful registration
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Registration error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setAddress = (address) => {
    setFormData({
      ...formData,
      addr: address,
    });

    // Clear address error when address is set
    setFormErrors({
      ...formErrors,
      addr: null,
    });
  };

  // Load Daum address script
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <FormContainer>
      <Title style={{ fontSize: "2rem" }}>회원가입</Title>

      <Form onSubmit={handleSubmit}>
        <FullWidthField>
          <div style={{ display: "flex", gap: "10px" }}>
            <FormField
              label="아이디"
              id="uid"
              name="uid"
              type="text"
              placeholder="5~20자의 영문, 숫자 조합"
              value={formData.uid}
              onChange={handleChange}
              error={formErrors.uid}
              style={{ flexGrow: 1 }}
            />
            <Button
              type="button"
              onClick={handleIdCheck}
              disabled={isCheckingId || !formData.uid}
              style={{
                marginTop: "37px",
                height: "44px",
                width: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCheckingId ? "확인중..." : "중복확인"}
            </Button>
          </div>
          {showIdSuccess && (
            <IdCheckSuccess>사용 가능한 아이디입니다</IdCheckSuccess>
          )}
        </FullWidthField>

        <FormField
          label="비밀번호"
          id="upw"
          name="upw"
          type="password"
          placeholder="8자 이상, 영문, 숫자, 특수문자 포함"
          value={formData.upw}
          onChange={handleChange}
          error={formErrors.upw}
        />

        <FormField
          label="비밀번호 확인"
          id="confirmPw"
          name="confirmPw"
          type="password"
          placeholder="비밀번호 재입력"
          value={formData.confirmPw}
          onChange={handleChange}
          error={formErrors.confirmPw}
        />

        <FormField
          label="닉네임"
          id="nick"
          name="nick"
          type="text"
          placeholder="2~20자 사이의 닉네임"
          value={formData.nick}
          onChange={handleChange}
          error={formErrors.nick}
        />

        <div>
          <label
            htmlFor="gender"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#333",
              marginBottom: "8px",
              display: "block",
            }}
          >
            성별
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px 15px",
              margin: "8px 0",
              border: formErrors.gender
                ? "1px solid #ff3860"
                : "1px solid #e0e0e0",
              borderRadius: "4px",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
          >
            <option value="">성별 선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
          {formErrors.gender && (
            <div
              style={{ color: "#ff3860", fontSize: "14px", marginTop: "5px" }}
            >
              {formErrors.gender}
            </div>
          )}
        </div>

        <FormField
          label="전화번호"
          id="phone"
          name="phone"
          type="tel"
          placeholder="'-' 없이 입력"
          value={formData.phone}
          onChange={handleChange}
          error={formErrors.phone}
        />

        <FormField
          label="생년월일"
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          error={formErrors.dob}
        />

        <FullWidthField>
          <DaumAddressField
            address={formData.addr}
            setAddress={setAddress}
            error={formErrors.addr}
          />
        </FullWidthField>

        <ButtonGroup>
          <Button
            type="submit"
            fullWidth
            disabled={
              isSubmitting ||
              Object.keys(formErrors).some((key) => formErrors[key]) ||
              !isIdValid ||
              !formData.uid ||
              !formData.upw ||
              !formData.confirmPw ||
              !formData.nick ||
              !formData.gender ||
              !formData.phone ||
              !formData.dob ||
              !formData.addr
            }
          >
            {isSubmitting ? "처리중..." : "회원가입"}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
