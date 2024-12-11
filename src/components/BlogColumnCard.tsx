import { useNavigate } from "react-router-dom";
import galleryImg from "src/assets/default-gallery.jpg";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";

type Props = {
  blog: TBlog;
};

const BlogColumnCard = ({ blog }: Props) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="border rounded-lg overflow-hidden cursor-pointer"
      key={blog.id}
    >
      <div className="bg-gray-100 w-full h-52 relative">
        <img src={galleryImg} alt="" className="absolute w-full h-full" />
      </div>
      <div className="px-3 mt-2 pb-2">
        <div className="text-base mb-4 font-bold">{blog.title}</div>
        <p className="text-sm text-gray-700 text-ellipsis line-clamp-3 mb-3">
          {blog.content}
        </p>
        {blog.create_time && (
          <div className="text-sm text-gray-500">
            {convertFirebaseTimestampToDate(blog.create_time)}
          </div>
        )}
      </div>
    </li>
  );
};

export default BlogColumnCard;
