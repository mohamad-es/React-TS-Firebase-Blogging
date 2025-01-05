import { Link } from "react-router-dom";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import { Image01Icon } from "hugeicons-react";

type Props = {
  blog: TBlog;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div
      className="border rounded-2xl overflow-hidden col-span-1 flex flex-col"
      key={blog.id}
    >
      <div className="w-full h-52 flex items-center justify-center relative border-b">
        {blog.img ? (
          <img src={blog.img} className="w-full h-full object-cover" />
        ) : (
          <Image01Icon size={100} className="text-gray-600" />
        )}
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <Link
            to={`/blog/${blog.id}`}
            className="line-clamp-2 flex-1 hover:text-blue-600 transition-all font-bold c-black text-xl"
          >
            {blog.title}
          </Link>
        </div>

        <div className="flex gap-3 justify-between items-center text-sm mt-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 ">
              {blog.user_email.substring(0, 1).toUpperCase()}
            </div>
            <Link
              to={`/${blog.user_id}`}
              className="c-gray hover:text-blue-600 transition-all"
            >
              {blog.user_email}
            </Link>
          </div>
          <div className="c-gray">
            {convertFirebaseTimestampToDate(blog.create_time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
