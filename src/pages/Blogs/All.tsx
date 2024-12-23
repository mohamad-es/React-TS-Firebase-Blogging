import { useEffect, useState } from "react";
import BlogCard from "src/components/blog/BlogCard";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import NotFound from "src/components/global/NotFound";
import { blogs_data } from "src/data/blog";
import { getAllBlogs } from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllBlogs({ setBlogs, setError, setLoading });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0)
    return <NotFound text={blogs_data.not_found} />;

  return (
    <div>
      <h2>{blogs_data.not_found}</h2>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
