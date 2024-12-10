import { useState, useEffect } from "react";
import { auth } from "src/config/firebaseConfig";
import { Link, useParams } from "react-router";
import { TBlog } from "src/types/blog";
import { getSingleBlog } from "src/services/blogServices";

const GetSingleBlog = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="panel">
      {blog ? (
        <>
          <h1 className="text-3xl font-extrabold mb-10">{blog.title}</h1>
          <p>{blog.content}</p>
        </>
      ) : (
        <p>Blog not found.</p>
      )}

      {blog?.user_id === auth.currentUser?.uid && (
        <Link to={"edit"} className="btn btn-primary text-white mt-5 w-32">
          Edit 📝
        </Link>
      )}
    </div>
  );
};

export default GetSingleBlog;
