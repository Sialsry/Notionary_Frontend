import axios from "axios";

const API_BASE_URL = 'http://localhost:4000';

const CreateHeart = async ({ uid, post_id }) => {
  const { data } = await axios.post(`${API_BASE_URL}/main/heart`, {
    uid, post_id
  });
  // console.log("API 응답 데이터:", data);
  return data;
}

export {CreateHeart}