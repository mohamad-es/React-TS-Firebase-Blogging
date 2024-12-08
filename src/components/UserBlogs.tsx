import { useState, useEffect } from "react";
import { query, getDocs, collection, where } from "firebase/firestore";
import { db } from "src/services/firebaseConfig";
import { useParams } from "react-router";

const UserBlogs = () => {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("userId", "==", params.uid));

      try {
        const querySnapshot = await getDocs(q);
        const fetchedBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchBlogs);

        setBlogs(fetchedBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [params.uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>No blogs found.</div>;

  return (
    <div>
      <h3 className="mb-2 text-lg">Blog posted</h3>
      <ul className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <li className="border rounded-lg overflow-hidden" key={blog.id}>
            <div className="bg-gray-100 w-full h-28"></div>
            <div className="px-3 mt-4 pb-2">
              <div className="text-base min-h-16">{blog.title}</div>
              <p className="text-sm text-gray-700 text-ellipsis line-clamp-3">{blog.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
