
import Main from "./Components/Pages/Main";
import SignupPage from "./Components/Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import MyPage from "./Components/Pages/MyPage";
import Myproject from "./Components/Pages/workspace/Myproject";
import Textarea from "./Components/Atoms/newworkspace/workspacepage/Textarea";
import BlockEditor from "./Components/Atoms/newworkspace/BlockEditor";
import NewBlock from "./Components/Atoms/newworkspace/Newspace";
import Sidebarcontent from "./Components/Molecules/newworkspace/Sidebarcontent";
import Sidebar from "./Components/Templates/Sidebar";
import Selectpage from "./Components/Pages/workspace/Selectpage";
import { useParams } from "react-router-dom";
import Detailpage from "./Components/Pages/workspace/Detailpage";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/workspace/detail" element={<Detailpage />} /> */}
          <Route path="/workspace/selectspace/개인 워크스페이스/:foldername/:filename" element={<Detailpage />} />
          <Route path="/workspace/selectspace/개인 워크스페이스" element={<Selectpage header={'개인 워크스페이스'} />} />
          <Route path="/workspace/selectspace/팀 워크스페이스" element={<Selectpage header={'팀 워크스페이스'}/>} />
          <Route path="/workspace" element={<Sidebar />} />
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
