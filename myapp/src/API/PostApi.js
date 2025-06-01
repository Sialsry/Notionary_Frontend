import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const AllCategoryPost = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/main`);
  console.log("전체 게시글 응답 데이터:", data);
  return data;
};

const SubCategoryPost = async ({ category_name, SubCategory }) => {
  // console.log(`카테고리 : ${categoryId}, 세부 카테고리 : ${SubCategory}`)
  const { data } = await axios.post(`${API_BASE_URL}/main/subpost`, {
    category_name,
    SubCategory,
  });
  console.log("서브 카테고리 응답 데이터: ", data);
  return data;
};

const EtcCategoryPost = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/main/etc`);
  console.log("기타 카테고리 응답 데이터:", data);
  return data;
};
const CreatePost = async (formData) => {
  console.log(formData, 'formData')
  const { data } = await axios.post(`${API_BASE_URL}/post`, formData);
  console.log("서버에서 받은 데이터 : ", data);
  return data;
};


const UpdatePost = async ({post_id, formData}) => {
  const { data } = await axios.put(`${API_BASE_URL}/post/edit/${post_id}`, formData);
  console.log("업데이트 결과 데이터:", data);
  return data;
};

const GetPostById = async (post_id) => {
  const { data } = await axios.get(`${API_BASE_URL}/post/${post_id}`);
  console.log("수정할 게시글 ID  데이터" , data)
  return data;
};

const GetWorkSpace = async (uid) => {
  const { data } = await axios.post(`${API_BASE_URL}/post/getWorkspace`, {
    uid: uid,
  });
  console.log("워크스페이스 조회 데이터 한번만 ", data);
  return data;
};

export {
  AllCategoryPost,
  SubCategoryPost,
  EtcCategoryPost,
  CreatePost,
  UpdatePost,
  GetWorkSpace,
  GetPostById
};
