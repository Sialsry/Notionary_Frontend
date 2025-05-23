import axios from "axios"

const API_BASE_URL = 'http://localhost:4000';

const AllCategoryPost = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/main`);
  console.log("API 응답 데이터:", data);
  return data;
}

const SubCategoryPost = async ({category_name , SubCategory}) => {
  // console.log(`카테고리 : ${categoryId}, 세부 카테고리 : ${SubCategory}`)
  const { data }  = await axios.post(`${API_BASE_URL}/main/subpost`,{
     category_name,
     SubCategory
  })
  console.log("서브 카테고리 응답 데이터: ", data);
  return data;
}

export {AllCategoryPost, SubCategoryPost}
