import { useEffect, useState } from "react";
import { Link } from "react-router";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";

const FeaturedBlog = () => {
  const [blog, setBlog] = useState<TBlog>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const featureBlogId = "muHMVD8TQqxz8wk6YRll";

  useEffect(() => {
    getSingleBlog({
      blogId: featureBlogId,
      setBlog,
      setError,
      setLoading,
    });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text="Blog Does not exist" />;

  return (
    <div>
      <h3>Featured Blog</h3>
      <Link to={`/blog/${featureBlogId}`} className="mt-6 text-5xl mb-14 font-extrabold block hover:text-blue-600 transition-all">
        {blog?.title}
      </Link>
      <p>
        Explore the latest trends and technologies shaping the future of web
        development. From AI-powered tools to new frameworks.
      </p>
      <div className="flex items-center gap-4 mt-12">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
          A
        </div>
        <div>
          <Link  className="transition-all hover:text-blue-600" to={`/${blog?.user_id}`}>{blog?.user_email}</Link>
          <div className="text-sm">
            {blog?.create_time &&
              convertFirebaseTimestampToDate(blog.create_time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
