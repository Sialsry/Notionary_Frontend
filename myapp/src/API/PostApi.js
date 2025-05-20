import axios from "axios"

const API_BASE_URL = 'http://localhost:4000';

const AllCategoryPost = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/main`);
      console.log("API 응답 데이터:", data);
    return data;
}

export {AllCategoryPost}
