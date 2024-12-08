import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoutes";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "./layout";
import Profile from "./pages/Profile";
import WriteBlog from "./pages/blogs/Write";
import About from "./pages/About";
import ReadBlog from "./pages/blogs/Read";

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
            <Route path="/blog/:blogid" element={<ReadBlog />} />
            <Route path="/:uid/write" element={<WriteBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
