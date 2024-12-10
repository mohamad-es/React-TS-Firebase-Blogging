import {
  collection,
  query,
  getDocs,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { db } from "src/config/firebaseConfig";
import { TBlog } from "src/types/blog";
import defaultGallery from "src/assets/default-gallery.jpg";
import { convertFirebaseTimestampToDate } from "src/utils/ConvertTime";
import UserProfileIcon from "src/components/icons/UserProfileIcon";

const Landing = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getLatestBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("create_time", "desc"), limit(5));
      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot, "snap");

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

  if (loading)
    return (
      <div className="panel flex justify-center">
        <div className="loading loading-infinity" />
      </div>
    );

  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>no blog found.</div>;

  return (
    <div className="panel p-3">
      <h1 className="px-4 mb-10 mt-4 text-2xl font-semibold">Latest Blogs</h1>
      <div>
        {blogs?.map((item) => (
          <div
            className="flex flex-col gap-5 py-5 border-b last-of-type:border-none px-4"
            key={item.id}
          >
            <div>
              <div className="text-sm flex items-center gap-2 tracking-wide">
                <UserProfileIcon size={32} />
                <div className="flex flex-col">
                  <Link
                    to={`/${item.user_id}`}
                    className="text-sm text-blue-500"
                  >
                    {item.user_email}
                  </Link>
                  <div className="text-xs text-gray-500">
                    {convertFirebaseTimestampToDate(item.create_time)}
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate(`/blog/${item.id}`)}
              className="flex gap-10 ps-11 cursor-pointer group"
            >
              <div className="w-full">
                <div className="flex w-full justify-between">
                  <div className="font-semibold text-2xl transition-all group-hover:text-blue-500">
                    {item?.title}
                  </div>
                </div>

                <p className="mt-5 line-clamp-3">{item?.content}</p>
              </div>
              <div className="w-36 min-w-36 h-32 overflow-hidden rounded-lg">
                <img
                  src={defaultGallery}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
