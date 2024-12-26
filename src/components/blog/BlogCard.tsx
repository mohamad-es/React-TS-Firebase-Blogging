import { Link, useNavigate } from "react-router-dom";
import galleryImg from "src/assets/default-gallery.jpg";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import { PencilEdit01Icon, UserIcon } from "hugeicons-react";
import { RenderHtml } from "../RenderHtml";
import { auth } from "src/config/firebaseConfig";

type Props = {
  blog: TBlog;
};

const BlogCard = ({ blog }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="border rounded-2xl overflow-hidden col-span-1 cursor-pointer flex flex-col"
      key={blog.id}
    >
      <div className="bg-gray-100 w-full h-52 relative">
        <img
          src={galleryImg}
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between">
        <h3 className="line-clamp-2 flex-1">{blog.title}</h3>
        <div className="line-clamp-2 mt-4">
          <RenderHtml htmlString={blog.content} />
        </div>

        <div className="flex gap-3 items-center text-sm mt-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 ">
              {blog.user_email.substring(0, 1).toUpperCase()}
            </div>
            <div className="c-gray">{blog.user_email}</div>
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
