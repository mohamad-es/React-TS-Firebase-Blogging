import { useState, useEffect, Fragment } from "react";
import { auth, db } from "src/config/firebaseConfig";
import { Link, useParams, useNavigate } from "react-router";
import { TBlog } from "src/types/blog";
import { getSingleBlog } from "src/services/blogServices";
import PencilIcon from "src/components/icons/PencilIcon";
import TrashIcon from "src/components/icons/TrashIcon";
import { deleteDoc, doc } from "firebase/firestore";
import { toastInstance } from "src/utils/Toast";

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
      navigate(`/${auth.currentUser?.uid}`); // Redirect to the blogs list or another page
    } catch (err) {
      setBtnLoading(false);
      console.error("Error deleting blog:", err);
      setError("Failed to delete the blog.");
    }
  };

  if (loading)
    return (
      <div className="panel flex pt-10 justify-center">
        <div className="loading loading-infinity" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="panel">
      {blog?.user_id === auth.currentUser?.uid && (
        <div className="flex justify-end gap-3 mb-5">
          <Link to={"edit"} className="btn btn-primary">
            Edit
            <PencilIcon size={20} color="white" />
          </Link>
          <button className="btn btn-error w-28" onClick={deleteBlog}>
            {btnLoading ? (
              <div className="loading loading-infinity" />
            ) : (
              <Fragment>
                Delete
                <TrashIcon size={20} />
              </Fragment>
            )}
          </button>
        </div>
      )}
      {blog ? (
        <>
          <h1 className="text-3xl font-extrabold mb-10">{blog.title}</h1>
          <p>{blog.content}</p>
        </>
      ) : (
        <p>Blog not found.</p>
      )}
    </div>
  );
};

export default ReadBlog;
