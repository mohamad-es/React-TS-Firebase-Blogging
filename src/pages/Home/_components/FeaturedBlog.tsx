import { Image01Icon } from "hugeicons-react";
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

  const featureBlogId = "T1Fxk8JmRkLB8tEVa4xw";

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
    <div className="flex gap-16 mb-20">
      <div className="flex-1">
        <div>
          <div className="font-normal">Featured Blog</div>
          <Link
            to={`/blog/${featureBlogId}`}
            className="mt-6 text-5xl mb-14 font-extrabold block hover:text-blue-600 transition-all"
          >
            {blog?.title}
          </Link>
          <div className="flex gap-5 mt-12 justify-between items-center">
            <div className="flex items-center gap-4 ">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                A
              </div>
              <div>
                <Link
                  className="transition-all hover:text-blue-600"
                  to={`/${blog?.user_id}`}
                >
                  {blog?.user_email}
                </Link>
                
              </div>
            </div>
            <p className="text-sm">
              Create time: {blog?.create_time &&
                convertFirebaseTimestampToDate(blog.create_time)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="rounded-2xl border flex items-center overflow-hidden justify-center h-72">
          {blog?.img ? (
            <img className="w-full h-full object-cover" src={blog.img} />
          ) : (
            <Image01Icon size={200} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;
