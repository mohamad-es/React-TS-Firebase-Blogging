import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoutes";
import Home from "./pages/home";
import Profile from "./pages/profile/Profile";
import ProfileSetting from "./pages/profile/ProfileSetting";
import PublicProfile from "./pages/profile/PublicProfile";
import WriteBlog from "./pages/blog/Write";
import ReadBlog from "./pages/blog/Read";
import EditBlog from "./pages/blog/Edit";

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
