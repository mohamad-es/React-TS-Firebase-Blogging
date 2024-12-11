import { limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import { getBlogListByQuery } from "src/services/blogServices";
import BlogRowCard from "src/components/BlogRowCard";

const Home = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogListByQuery({
      filterQuery: [orderBy("create_time", "desc"), limit(5)],
      setBlogs,
      setError,
      setLoading,
    });
  }, []);

  if (loading)
    return (
      <div className="panel flex justify-center">
        <div className="loading loading-infinity" />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (blogs.length === 0) return <div>no blog found.</div>;

  return (
    <div className="panel p-3">
      <h1 className="px-4 mb-10 mt-4 text-2xl font-semibold">Latest Blogs</h1>
      <div>
        {blogs?.map((blog) => (
          <BlogRowCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
