import { Link } from "react-router-dom";
import { TBlog } from "src/types/blog";
import { Image01Icon } from "hugeicons-react";
import UserProfileCard from "../User/UserProfileCard";
import { useReadUser } from "src/hooks/user/useReadUser";

type Props = {
  blog: TBlog;
};

const BlogCard = ({ blog }: Props) => {
  const { state } = useReadUser(blog.user_id);
  return (
    <div className="border rounded-2xl overflow-hidden col-span-1 flex flex-col bg-white" key={blog.id}>
      <div className="w-full h-48 flex items-center justify-center relative border-b">
        {blog.img ? (
          <img src={blog.img} className="w-full h-full object-cover" />
        ) : (
          <Image01Icon size={100} className="text-gray-600" />
        )}
      </div>
      <div className="p-6 gap-4 flex flex-col justify-between flex-1">
        <div>
          <Link
            to={`/blog/${blog.id}`}
            className="line-clamp-2 flex-1 hover:text-blue-600 transition-all font-bold c-black text-xl first-letter:uppercase"
          >
            {blog.title}
          </Link>
        </div>

        <UserProfileCard
          img={state.data?.img}
          error={state.error}
          loading={state.loading}
          user_email={blog.user_email}
          user_id={blog.user_id}
        />
      </div>
    </div>
  );
};

export default BlogCard;
