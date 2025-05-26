import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// 기존 API 함수들
export const checkIdDuplicate = async (uid) => {
  try {
    const response = await axios.post(`${API_URL}/auth/check-id`, { uid });
    return response.data;
  } catch (error) {
    console.error("Error checking ID:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 로그인 관련 API 함수 추가
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log("너 누구야",response)

    // 로그인 성공 시 토큰을 쿠키에 저장
    if (response.data.success && response.data.token) {
      Cookies.set("authToken", response.data.token, { expires: 1 }); // 1일 후 만료

      // 사용자 정보 로컬 스토리지에 저장 (선택적)
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error verifying token:", error);
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    throw error;
  }
};

export const logout = () => {
  Cookies.remove("authToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
