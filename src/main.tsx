import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import './index.css'
import App from './App.tsx'
import Register from './pages/Register.tsx';
import PrivateRoute from './utils/PrivateRoutes.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/blogs" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
