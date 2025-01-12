import { PencilEdit01Icon, Delete01Icon } from "hugeicons-react";
import { Link, useParams } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { useDeleteBlog } from "src/hooks/useBlog";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";

type Props = {
  blog: TBlog | undefined;
};

const ReadFormSidebar = ({blog}:Props) => {
  const params = useParams();
  const { btnLoading, deleteBlog } = useDeleteBlog(params.blogid!);
  return (
    <div className="col-span-3 flex">
      <div className="fixed">
        <div>
          <div className="font-semibold text-sm">Writter</div>
          <Link
            to={`/${blog?.user_id}`}
            className="c-gray hover:text-blue-700 transition-all"
          >
            {blog?.user_email}
          </Link>

          <div className="font-semibold text-sm mb-2 mt-7">Created Time</div>
          <div className="text-gray-500 text-[15px]">
            {blog?.create_time &&
              convertFirebaseTimestampToDate(blog?.create_time)}
          </div>

          <div className="font-semibold text-sm mb-2 mt-7">Update Time</div>
          <div className="text-gray-500 text-[15px]">
            {blog?.update_time
              ? convertFirebaseTimestampToDate(blog?.update_time)
              : "Still no update on this blog !"}
          </div>
        </div>

        {blog?.user_id === auth.currentUser?.uid && (
          <div className="mt-10">
            <div className="mb-4 font-semibold text-sm">Manage your blog</div>
            <div className="flex justify-end mb-5 max-w-min overflow-hidden rounded-xl border h-10">
              <Link
                className="h-full bg-blue-700 text-white text-sm gap-2 flex w-24 justify-center items-center transition-all hover:bg-blue-700 hover:text-white"
                to={"edit"}
              >
                Edit
                <PencilEdit01Icon size={16} />
              </Link>
              <button
                className="flex w-24 h-full bg-red-600 text-white items-center transition-all hover:bg-red-600 hover:text-white justify-center"
                onClick={deleteBlog}
              >
                {btnLoading ? (
                  <div className="loading loading-infinity" />
                ) : (
                  <div className="flex items-center text-sm gap-2">
                    Delete
                    <Delete01Icon size={16} />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadFormSidebar;
