import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultPage from "../layout/DefaultPage";
import Home from "../pages/Home";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
