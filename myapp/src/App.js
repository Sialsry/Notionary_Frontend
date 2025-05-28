
import Main from "./Components/Pages/Main";
import SignupPage from "./Components/Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detailpage from './Components/Pages/workspace/Detailpage'
import Selectpage from './Components/Pages/workspace/Selectpage'
import LoginPage from "./Components/Pages/LoginPage";
import PostPage from './Components/Pages/PostPage';
import MyPage from "./Components/Pages/MyPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const select = useSelector(state => state);
  useEffect(()=> {
    console.log(select,"11111111111232312")
  },[select])
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          {/* <Route path="/workspace/detail" element={<Detailpage />} /> */}
          {/* <Route path="/workspace/selectspace/개인 워크스페이스/:foldername/:filename" element={<Detailpage />} /> */}
          <Route path="/workspace/selectspace/:workspacename/:foldername/:filename" element={<Detailpage />} />
          <Route path="/workspace/selectspace/개인 워크스페이스" element={<Selectpage header={'개인 워크스페이스'} />} />
          <Route path="/workspace/selectspace/팀 워크스페이스" element={<Selectpage header={'팀 워크스페이스'}/>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
