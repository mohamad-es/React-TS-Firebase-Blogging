import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EditBlog from "./pages/Blogs/Edit";
import ReadBlog from "./pages/Blogs/Read";
import WriteBlog from "./pages/Blogs/Write";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import ProfileSetting from "./pages/Profile/ProfileSetting";
import PublicProfile from "./pages/Profile/PublicProfile";
import PrivateRoute from "./utils/PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/:uid" element={<PublicProfile />} />
            <Route path="/:uid/profile" element={<Profile />} />
            <Route path="/:uid/setting" element={<ProfileSetting />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="/blog/:blogid" element={<ReadBlog />} />
            <Route path="/blog/:blogid/edit" element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
