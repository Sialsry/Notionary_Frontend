import Main from "./Components/Pages/Main";
import SignupPage from "./Components/Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detailpage from "./Components/Pages/workspace/Detailpage";
import Selectpage from "./Components/Pages/workspace/Selectpage";
import LoginPage from "./Components/Pages/LoginPage";
import PostPage from "./Components/Pages/PostPage";
import MyPage from "./Components/Pages/MyPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PostDetail from "./Components/Pages/PostDetail";
import Sidebar from "./Components/Templates/Sidebar";
import Header from "./Components/Templates/Header";

function App() {
  const select = useSelector((state) => state);
  useEffect(() => {
    console.log(select, "11111111111232312");
  }, [select]);
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Sidebar /> 
        <Routes>
          <Route
            path="/workspace/selectspace/:workspacename/:foldername/:filename"
            element={<Detailpage />}
          />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/edit/:post_id" element={<PostPage />} /> 
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:post_id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
