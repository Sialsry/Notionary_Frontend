
import Main from "./Components/Pages/Main";
import SignupPage from "./Components/Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import MyPage from "./Components/Pages/MyPage";
import Myproject from "./Components/Pages/Myproject";
import Privatepage from "./Components/Pages/Privatepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/privatepage" element={<Privatepage />} />
          <Route path="/workspace" element={<Myproject />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
