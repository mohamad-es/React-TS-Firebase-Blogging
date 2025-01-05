import { useState, useEffect } from "react";
import { auth, db } from "src/config/firebaseConfig";
import { Link, useParams, useNavigate } from "react-router";
import { TBlog } from "src/types/blog";
import { getSingleBlog } from "src/services/blogServices";
import { deleteDoc, doc } from "firebase/firestore";
import { toastInstance } from "src/utils/Toast";
import Loading from "src/components/global/Loading";
import ErrorAlert from "src/components/global/ErrorAlert";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import Preview from "src/components/Preview";
import { Delete01Icon, PencilEdit01Icon } from "hugeicons-react";

const ReadBlog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getSingleBlog({
      blogId: params.blogid!,
      setBlog,
      setError,
      setLoading,
    });
  }, [params.blogid]);

  const deleteBlog = async () => {
    if (!params.blogid) {
      setError("Invalid blog ID");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    setBtnLoading(true);

    try {
      await deleteDoc(doc(db, "blogs", params.blogid));
      setBtnLoading(false);
      toastInstance({ text: "Blog deleted successfully!", type: "success" });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (err) {
      setBtnLoading(false);
      console.error("Error deleting blog:", err);
      setError("Failed to delete the blog.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (!blog) return <div>error not found</div>;

  return (
    <div className="grid grid-cols-12 relative gap-10">
      <div className="col-span-9 bg-gray-50 rounded-xl overflow-hidden">
        <img src={blog.img} alt="" className="w-full h-64 object-contain" />
        <div className="p-10">
          <h1 className="text-3xl font-extrabold mb-10">{blog?.title}</h1>
          <Preview content={blog?.content} />
        </div>
      </div>

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

            <div className="font-semibold text-sm mb-2 mt-7">
              Created Time
            </div>
            <div className="text-gray-500 text-[15px]">
              {blog?.create_time &&
                convertFirebaseTimestampToDate(blog?.create_time)}
            </div>

            <div className="font-semibold text-sm mb-2 mt-7">
              Update Time
            </div>
            <div className="text-gray-500 text-[15px]">
              {blog?.update_time
                ? convertFirebaseTimestampToDate(blog?.update_time)
                : "Still no update on this blog !"}
            </div>
          </div>

          {blog?.user_id === auth.currentUser?.uid && (
            <div className="mt-10">
              <div className="mb-4 font-semibold text-sm">
                Manage your blog
              </div>
              <div className="flex justify-end mb-5 max-w-min overflow-hidden rounded-xl border h-10">
                <Link
                  className="h-full text-sm gap-2 flex w-24 justify-center items-center transition-all hover:bg-blue-700 hover:text-white"
                  to={"edit"}
                >
                  Edit
                  <PencilEdit01Icon size={16} />
                </Link>
                <button
                  className="flex w-24 h-full items-center transition-all hover:bg-red-600 hover:text-white justify-center"
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
    </div>
  );
};

export default ReadBlog;
