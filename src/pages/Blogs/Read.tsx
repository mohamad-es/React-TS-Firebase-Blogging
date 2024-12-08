import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { useParams } from "react-router";

const GetSingleBlog = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "blogs", params.blogid!); // Replace "blogs" with your collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.blogid) {
      fetchBlog();
    }
  }, [params.blogid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="panel">
      {blog ? (
        <>
          <h1 className="text-3xl font-extrabold mb-10">{blog.title}</h1>
          <p>{blog.content}</p>
          <p className="mt-4">
            <strong>Author ID:</strong> {blog.userId}
          </p>
        </>
      ) : (
        <p>Blog not found.</p>
      )}
    </div>
  );
};

export default GetSingleBlog;
