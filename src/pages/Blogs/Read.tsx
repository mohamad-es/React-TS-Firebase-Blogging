import { useState, useEffect, Fragment } from "react";
import { auth, db } from "src/config/firebaseConfig";
import { Link, useParams, useNavigate } from "react-router";
import { TBlog } from "src/types/blog";
import { getSingleBlog } from "src/services/blogServices";
import { deleteDoc, doc } from "firebase/firestore";
import { toastInstance } from "src/utils/Toast";
import { RenderHtml } from "src/components/RenderHtml";
import Loading from "src/components/global/Loading";
import ErrorAlert from "src/components/global/ErrorAlert";
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

  return (
    <div className="grid grid-cols-12 relative gap-10">
      <div className="col-span-8">
        {blog ? (
          <>
            <h1 className="text-3xl font-extrabold mb-10">{blog.title}</h1>
            <RenderHtml htmlString={blog.content} />
          </>
        ) : (
          <p>Blog not found.</p>
        )}
      </div>

      <div className="col-span-4">
        {blog?.user_id === auth.currentUser?.uid && (
          <div className="flex justify-end gap-3 fixed bottom-10 mb-5">
            <Link to={"edit"} className="btn btn-primary">
              Edit
              <PencilEdit01Icon size={20} color="white" />
            </Link>
            <button className="btn btn-error w-28" onClick={deleteBlog}>
              {btnLoading ? (
                <div className="loading loading-infinity" />
              ) : (
                <Fragment>
                  Delete
                  <Delete01Icon size={20} />
                </Fragment>
              )}
            </button>
          </div>
        )}
        <div className="fixed flex flex-col justify-between border h-80 w-96 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
              {blog?.user_email.substring(0, 1).toUpperCase()}
            </div>
            <div className="c-gray">{blog?.user_email}</div>
          </div>
          <Link to={`/${blog?.user_id}`} className="btn btn-primary">
            {" "}
            View Profile{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
