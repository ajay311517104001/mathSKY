import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/Product/Product";
import New from "./pages/Productcrud/Productcrud";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import QAset from "./pages/QAset/Qaset";
import QAcrud from "./pages/QAcrud/QAcrud";
import QAkeyin from "./pages/QAset/QAkeyin";
import QAadd from "./pages/QAcrud/Add&UpdateMcq";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index  element={<Login />} />
          
         <Route path="dashboard" element={<Home />} /> 
          
            <Route path="users">
              <Route index element={<List />} />
              <Route path="u" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            
            <Route path="products">
              {/* <Route index element={<List />} /> */}
              <Route index element={<Single />} />
              <Route
                path="new"
                element={<New  />}
              />
            </Route>
            <Route path="QAset">
              {/* <Route index element={<List />} /> */}
              <Route index element={<QAset />} />
              <Route
                path="new"
                element={<QAcrud/>}
              />
                   <Route
                path="QAkeyin"
                element={<QAkeyin/>}
              />
                    <Route
                path="QAadd"
                element={<QAadd/>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
