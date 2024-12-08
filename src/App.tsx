import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./auth/Register";
import PrivateRoute from "./utils/PrivateRoutes";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Layout from "./layout";
import Profile from "./pages/Profile";
import WriteBlog from "./pages/Blogs/Write";
import About from "./pages/About";
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
            <Route path="/:blid" element={<ReadBlog />} />
            <Route path="/:uid/write" element={<WriteBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
