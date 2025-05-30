import axios from "axios";

const API_BASE_URL = 'http://localhost:4000';

const CreateHeart = async ({ uid, post_id }) => {
  const { data } = await axios.post(`${API_BASE_URL}/main/heart`, {
    uid, post_id
  });
  console.log("좋아요 추가 및 조회 응답 데이터:", data);
  return data;
}

const DeleteHeart = async ({ uid, post_id }) => {
  const {data} = await axios.delete(`${API_BASE_URL}/main/heartDelete`, {
     data: { uid, post_id }
  });
  console.log("좋아요 취소 API 응답 :", data)
  return data;
}


export {CreateHeart, DeleteHeart}