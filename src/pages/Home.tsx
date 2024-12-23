import { limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import { getBlogListByQuery } from "src/services/blogServices";
import Loading from "src/components/global/Loading";
import { home_data } from "src/data/home";
import ErrorAlert from "src/components/global/ErrorAlert";
import NotFound from "src/components/global/NotFound";
import BlogCard from "src/components/blog/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogListByQuery({
      filterQuery: [orderBy("create_time", "desc"), limit(3)],
      setBlogs,
      setError,
      setLoading,
    });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0)
    return <NotFound text={home_data.latest_blogs.not_found} />;

  return (
    <div>
      <h2>{home_data.latest_blogs.title}</h2>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
