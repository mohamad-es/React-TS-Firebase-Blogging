import { Image01Icon } from "hugeicons-react";
import { Link } from "react-router";
import RenderState from "src/components/Custom/RenderState";
import UserProfileCard from "src/components/User/UserProfileCard";
import { home_data } from "src/data/home";
import { useFetchSingleBlog } from "src/hooks/useBlog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";

const FeaturedBlog = () => {
  const blogId = "T1Fxk8JmRkLB8tEVa4xw";
  const { blog, error, loading } = useFetchSingleBlog(blogId);

  return (
    <RenderState
      loading={loading}
      error={error}
      data={blog && Object?.keys(blog)?.length}
    >
      <div className="flex gap-16 mb-20">
        <div className="flex-1">
          <div>
            <div className="font-normal">{home_data.feature_blog.title}</div>
            <Link
              to={`/blog/${blogId}`}
              className="mt-6 text-5xl mb-14 font-extrabold block hover:text-blue-600 transition-all"
            >
              {blog?.title}
            </Link>

            <div className="flex gap-5 mt-12 justify-between items-center">
              <UserProfileCard
              error={error}
              loading={loading}
                user_email={blog?.user_email}
                user_id={blog?.user_id}
              />

              <p className="text-sm">
                {home_data.feature_blog.create_time}:{" "}
                {blog?.create_time &&
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
    </RenderState>
  );
};

export default FeaturedBlog;
