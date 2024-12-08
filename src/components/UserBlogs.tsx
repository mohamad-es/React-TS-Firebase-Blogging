import { useState, useEffect } from "react";
import { query, getDocs, collection, where } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { useNavigate, useParams } from "react-router";
import { TBlog } from "src/types/blog";

const UserBlogs = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("userId", "==", params.uid));

      try {
        const querySnapshot = await getDocs(q);
        const fetchedBlogs: TBlog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TBlog[];

        setBlogs(fetchedBlogs);
      } catch (error) {
        error instanceof Error ? setError(error.message) : console.log(error);
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
          <li
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="border rounded-lg overflow-hidden cursor-pointer"
            key={blog.id}
          >
            <div className="bg-gray-100 w-full h-28"></div>
            <div className="px-3 mt-4 pb-2">
              <div className="text-base min-h-16">{blog.title}</div>
              <p className="text-sm text-gray-700 text-ellipsis line-clamp-3">
                {blog.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
