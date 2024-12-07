import { useState, useEffect } from "react";
import { getUserBlogPosts } from "../db/blog";

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getUserBlogPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Your Blog Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
