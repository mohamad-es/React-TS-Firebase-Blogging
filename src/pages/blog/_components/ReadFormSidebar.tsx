import { Delete01Icon } from "hugeicons-react";
import { Link, useParams } from "react-router";
import LinkButton from "src/components/buttons/LinkButton";
import SubmitButton from "src/components/buttons/SubmitButton";
import { auth } from "src/config/firebaseConfig";
import { useDeleteBlog } from "src/hooks/blog/useDeleteBlog";
import { TBlog } from "src/types/blog";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";

type Props = {
  blog: TBlog | undefined;
};

const ReadFormSidebar = ({ blog }: Props) => {
  const params = useParams();
  const { btnLoading, deleteBlogSubmit } = useDeleteBlog(params.blogid!);
  return (
    <div className="col-span-3 flex">
      <div className="fixed">
        <div>
          <div className="font-semibold text-sm">Writter</div>
          <Link to={`/${blog?.user_id}`} className="c-gray hover:text-blue-700 transition-all">
            {blog?.user_email}
          </Link>

          <div className="font-semibold text-sm mb-2 mt-7">Created Time</div>
          <div className="text-gray-500 text-[15px]">
            {blog?.create_time && convertFirebaseTimestampToDate(blog?.create_time)}
          </div>

          <div className="font-semibold text-sm mb-2 mt-7">Update Time</div>
          <div className="text-gray-500 text-[15px]">
            {blog?.update_time ? convertFirebaseTimestampToDate(blog?.update_time) : "Still no update on this blog !"}
          </div>
        </div>

        {blog?.user_id === auth.currentUser?.uid && (
          <div className="mt-10">
            <div className="mb-4 font-semibold text-sm">Manage your blog</div>
            <LinkButton title="Edit" link="edit" />
            <SubmitButton
              icon={<Delete01Icon size={18} />}
              submitFn={deleteBlogSubmit}
              loading={btnLoading}
              title="Delete"
              className="btn-error ms-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadFormSidebar;
