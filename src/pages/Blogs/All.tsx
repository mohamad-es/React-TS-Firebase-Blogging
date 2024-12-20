import { useEffect, useState } from "react";
import BlogRowCard from "src/components/BlogRowCard";
import { getAllBlogs } from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllBlogs({ setBlogs, setError, setLoading });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="panel p-3">
      <h1 className="px-4 mb-10 mt-4 text-2xl font-semibold">All Blogs</h1>
      <div>
         {blogs?.map((blog) => (
          <BlogRowCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
