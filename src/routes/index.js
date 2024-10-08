import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultPage from "../layout/DefaultPage";
import CreatePostPage from "../pages/CreatePostPage";
import ListPostsPage from "../pages/ListPostsPage";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<CreatePostPage />} />
          <Route path="/list" element={<ListPostsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
