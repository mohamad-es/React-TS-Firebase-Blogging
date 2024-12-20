import { TBlog } from "src/types/blog";
import UserProfileIcon from "./icons/UserProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import defaultGallery from "src/assets/default-gallery.jpg";

type Props = {
  blog: TBlog;
};

const BlogRowCard = ({ blog }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col gap-5 py-5 border-b last-of-type:border-none px-4"
      key={blog.id}
    >
      <div>
        <div className="text-sm flex items-center gap-2 tracking-wide">
          <UserProfileIcon size={32} />
          <div className="flex flex-col">
            <Link to={`/${blog.user_id}`} className="text-sm text-blue-500">
              {blog.user_email}
            </Link>
            <div className="text-xs text-gray-500">
              {convertFirebaseTimestampToDate(blog.create_time)}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate(`/blog/${blog.id}`)}
        className="flex gap-10 ps-11 cursor-pointer group"
      >
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div className="font-semibold text-2xl transition-all group-hover:text-blue-500">
              {blog?.title}
            </div>
          </div>

          <p className="mt-5 line-clamp-3">{blog?.content}</p>
        </div>
        <div className="w-36 min-w-36 h-32 overflow-hidden rounded-lg">
          <img
            src={defaultGallery}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRowCard;
