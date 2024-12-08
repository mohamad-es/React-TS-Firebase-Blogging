import { collection, query, getDocs, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";

const Landing = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLatestBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, limit(5));
      try {
        const querySnapshot = await getDocs(q);
        const fetchBlogs: TBlog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TBlog[];
        setBlogs(fetchBlogs);
      } catch (error) {
        error instanceof Error ? setError(error.message) : console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getLatestBlogs();
  }, []);

  if (loading) return <div>loading ...</div>;
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>no blog found.</div>;

  return (
    <div className="panel">
      <h1>Lastest Blogs</h1>
      <ul>
        {blogs?.map((item) => (
          <li
            className="py-5 border-b last-of-type:border-none"
            key={item.createTime}
          >
            <h2>{item?.title}</h2>
            <p className="mt-2">{item?.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Landing;
