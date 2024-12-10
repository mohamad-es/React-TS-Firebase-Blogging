import { useState, useEffect } from "react";
import { query, getDocs, collection, where } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { useNavigate, useParams } from "react-router";
import { TBlog } from "src/types/blog";
import galleryImg from "src/assets/default-gallery.jpg";

const UserBlogs = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("user_id", "==", params.uid));

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

  // Function to convert timestamp to a readable date
  const convertTimestampToDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    return new Date(milliseconds).toLocaleString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div className="mt-5">No blog written yet.</div>;

  return (
    <div className="mt-5">
      <h3 className="mb-2 text-lg">Blog Posts</h3>
      <ul className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <li
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="border rounded-lg overflow-hidden cursor-pointer"
            key={blog.id}
          >
            <div className="bg-gray-100 w-full h-52 relative">
              <img src={galleryImg} alt="" className="absolute w-full h-full" />
            </div>
            <div className="px-3 mt-2 pb-2">
              <div className="text-base mb-4 font-bold">{blog.title}</div>
              <p className="text-sm text-gray-700 text-ellipsis line-clamp-3 mb-3">
                {blog.content}
              </p>
              {blog.create_time && (
                <div className="text-sm text-gray-500">
                  {convertTimestampToDate(blog.create_time)}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
