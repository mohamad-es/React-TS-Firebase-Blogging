import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoutes";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "./layout";
import Profile from "./pages/Profile";
import About from "./pages/About";
import EditBlog from "./pages/Blogs/Edit";
import WriteBlog from "./pages/Blogs/Write";
import ReadBlog from "./pages/Blogs/Read";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/:uid" element={<Profile />} />
            <Route path="/:uid/write" element={<WriteBlog />} />
            <Route path="/blog/:blogid" element={<ReadBlog />} />
            <Route path="/blog/:blogid/edit" element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
