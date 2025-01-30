import { Image01Icon } from "hugeicons-react";
import { Link } from "react-router";
import UserProfileCard from "src/components/shared/User/UserProfileCard";
import { home_data } from "src/data/home";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import FeaturedBlogSkeleton from "./FeaturedBlogSkeleton";
import { useReadBlog } from "src/hooks/blog/useReadBlog";
import RenderState from "src/components/shared/RenderState";

const FeaturedBlog = () => {
  const blogId = "cikC09CLQzRZpXpslIGS";
  const { state } = useReadBlog(blogId);
  const { data: blog, error, loading } = state;

  return (
    <RenderState loading={loading} error={error} loadingRender={<FeaturedBlogSkeleton />}>
      {blog && (
        <div className="flex-col flex lg:flex-row gap-16 w-screen mb-20 max-w-[1440px] mx-auto pt-10">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="font-normal">{home_data.feature_blog.title}</div>
              <Link
                to={`/blog/${blogId}`}
                className="mt-6 text-5xl font-black block hover:text-blue-600 transition-all"
              >
                {blog?.title}
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 justify-between items-center">
              <UserProfileCard
                error={error!}
                loading={loading!}
                user_email={blog?.user_email}
                user_id={blog?.user_id}
              />

              <p className="text-sm">
                {home_data.feature_blog.create_time}:{" "}
                {blog?.create_time && convertFirebaseTimestampToDate(blog?.create_time)}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-2xl border flex items-center overflow-hidden justify-center h-72">
              {blog?.img ? <img className="w-full h-full object-cover" src={blog?.img} /> : <Image01Icon size={200} />}
            </div>
          </div>
        </div>
      )}
    </RenderState>
  );
};

export default FeaturedBlog;
