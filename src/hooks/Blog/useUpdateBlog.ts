import { useState, useEffect } from "react";
import { TBlog } from "src/types/blog";

export const useUpdateBlog = (blog: TBlog) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blog) {
      const timer = setTimeout(() => {
        setContent(blog.content);
        setTitle(blog.title);
        setImage(blog.img || null);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [blog]);

  return { title, image, content, setImage, setTitle, setContent, loading };
};
