// src/api/blogApi.ts
import axios from "axios";

const API_URL = "https://your-backend-endpoint.com"; // This should be your backend URL

const createBlogPost = async (title: string, content: string) => {
  const user = localStorage.getItem("userId"); // Use Firebase user ID
  try {
    const response = await axios.post(`${API_URL}/blog`, { title, content, userId: user });
    return response.data;
  } catch (error) {
    console.error("Error creating blog post", error);
  }
};

export { createBlogPost };
