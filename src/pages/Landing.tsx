import { collection, query, getDocs, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import LatesBlogSkeleton from "src/components/skeleton/LatesBlogSkeleton";
import { auth, db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";

const Landing = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const skeleton = [1, 2, 3, 4, 5]; 

  useEffect(() => {
    const getLatestBlogs = async  () => {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, limit(5));
      try {
        const querySnapshot = await getDocs(q);
        const fetchBlogs: TBlog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // ,
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

  if (loading) return (
    <div className="panel">
      {skeleton.map((item) => (
        <LatesBlogSkeleton key={item} />
      ))}
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>no blog found.</div>;

  return (
    <div className="panel">
      {/* <h1>Lastest Blogs</h1> */}
      <div>
        {blogs?.map((item) => (
          <div
            onClick={() => navigate(`/blog/${item.id}`)}
            className="py-5 border-b last-of-type:border-none cursor-pointer transition-all hover:bg-gray-50 px-4"
            key={item.id}
          >
            <div className="mb-4 flex items-start gap-3">
              <UserProfileIcon size={32} />
              <div className="flex flex-col">
                <div>{item.user_email}</div>
                {/* <div className="text-xs">{item?.create_time}</div> */}
              </div>
            </div>
            <h2>{item?.title}</h2>
            <p className="mt-2 line-clamp-2">{item?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
