import { Link } from "react-router-dom";
import { TBlog } from "src/types/blog";
import { Image01Icon } from "hugeicons-react";
import UserProfileCard from "../User/UserProfileCard";

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

        <UserProfileCard
          error={null}
          loading={false}
          user_email={blog.user_email}
          user_id={blog.user_id}
        />
      </div>
    </div>
  );
};

export default BlogCard;
