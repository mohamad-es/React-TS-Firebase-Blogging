import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./auth/Register";
import PrivateRoute from "./utils/PrivateRoutes";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Layout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/blogs" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
