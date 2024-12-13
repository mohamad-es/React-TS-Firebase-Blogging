import BlogColumnCard from "src/components/BlogColumnCard";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import { where, } from "firebase/firestore";
import { getBlogListByQuery } from "src/services/blogServices";

const Profile = () => {
  const params = useParams();

  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogListByQuery({
      filterQuery: [
        where("user_email", "==", params.uemail),
      ],
      setBlogs,
      setError,
      setLoading,
    });
  }, [params.uemail]);

  if (loading)
    return (
      <div className="panel flex pt-10 justify-center">
        <div className="loading loading-infinity" />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (blogs.length === 0)
    return <div className="mt-5">No blog written yet.</div>;

  return (
    <div className="panel">
      <div className="flex flex-col items-center justify-center w-full gap-2 mb-20">
        <UserProfileIcon size={60} />
      </div>

      <div className="mt-5">
        <h3 className="mb-5 font-semibold text-xl">User Blog's</h3>
        <ul className="grid grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogColumnCard blog={blog} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
