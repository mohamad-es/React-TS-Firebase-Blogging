import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/blog-d9a1e/databases/(default)/documents",
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
