export const validateField = (name, value, formData = {}) => {
  switch (name) {
    case "uid":
      if (!value.trim()) return "아이디를 입력해주세요.";
      if (value.length < 5 || value.length > 20)
        return "아이디는 5~20자 사이여야 합니다.";
      if (!/^[a-zA-Z0-9]+$/.test(value))
        return "아이디는 영문, 숫자만 사용 가능합니다.";
      return null;

    case "upw":
      if (!value) return "비밀번호를 입력해주세요.";
      if (value.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
      if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
        return "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
      }
      return null;

    case "confirmPw":
      if (!value) return "비밀번호 확인을 입력해주세요.";
      if (formData.upw && value !== formData.upw)
        return "비밀번호가 일치하지 않습니다.";
      return null;

    case "nick":
      if (!value.trim()) return "닉네임을 입력해주세요.";
      if (value.length < 2 || value.length > 20)
        return "닉네임은 2~20자 사이여야 합니다.";
      return null;

    case "gender":
      // Optional field
      return null;

    case "phone":
      if (!value) return null; // Optional field
      if (!/^[0-9]{10,11}$/.test(value.replace(/[^0-9]/g, ""))) {
        return "올바른 전화번호 형식이 아닙니다.";
      }
      return null;

    case "dob":
      if (!value) return null; // Optional field
      const dobDate = new Date(value);
      const today = new Date();

      if (dobDate > today) return "미래 날짜는 선택할 수 없습니다.";
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      if (dobDate < minDate) return "유효한 생년월일이 아닙니다.";
      return null;

    case "addr":
      // Optional field
      return null;

    default:
      return null;
  }
};

export const validateForm = (formData) => {
  const errors = {};

  // Required fields
  const requiredFields = ["uid", "upw", "confirmPw", "nick"];

  requiredFields.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) errors[field] = error;
  });

  // Optional fields - only validate if they have values
  ["gender", "phone", "dob", "addr"].forEach((field) => {
    if (formData[field]) {
      const error = validateField(field, formData[field], formData);
      if (error) errors[field] = error;
    }
  });

  return errors;
};
