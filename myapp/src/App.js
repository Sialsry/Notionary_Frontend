import Main from "./Components/Pages/Main";
import {BrowserRouter, Route, Routes}  from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/main" element={<Main/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
