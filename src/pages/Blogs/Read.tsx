import { useState, useEffect } from "react";
import { auth } from "src/config/firebaseConfig";
import { Link, useParams } from "react-router";
import { TBlog } from "src/types/blog";
import { getSingleBlog } from "src/services/blogServices";
import PencilIcon from "src/components/icons/PencilIcon";
import TrashIcon from "src/components/icons/TrashIcon";

const ReadBlog = () => {
  const params = useParams();
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getSingleBlog({
      blogId: params.blogid!,
      setBlog,
      setError,
      setLoading,
    });
  }, []);

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
          <button className="btn btn-error">
            Delete
            <TrashIcon size={20} />
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
