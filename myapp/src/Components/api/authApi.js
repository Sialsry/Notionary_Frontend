import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

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
