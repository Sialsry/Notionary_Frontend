import Main from "./Components/Pages/Main";
import SignupPage from "./Components/Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import MyPage from "./Components/Pages/MyPage";
import PostPage from "./Components/Pages/PostPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
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
