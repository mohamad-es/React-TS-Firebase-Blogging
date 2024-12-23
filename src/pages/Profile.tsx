import BlogColumnCard from "src/components/blog/BlogCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import { where } from "firebase/firestore";
import { getBlogListByQuery } from "src/services/blogServices";
import { getSingleUser } from "src/services/userServices";
import { TUser } from "src/types/user";
import { UserCircle02Icon } from "hugeicons-react";
import Loading from "src/components/global/Loading";
import ErrorAlert from "src/components/global/ErrorAlert";

const Profile = () => {
  const params = useParams();

  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    getBlogListByQuery({
      filterQuery: [where("user_id", "==", params.uid)],
      setBlogs,
      setError,
      setLoading,
    });

    getSingleUser({
      setError: setUserError,
      setLoading: setUserLoading,
      setUser: setUser,
      userId: params.uid!,
    });
  }, [params.uid]);

  const isLoading = loading || userLoading;
  if (isLoading) return <Loading />;
  if (error || userError)
    return (
      <ErrorAlert
        text={error || userError || "Failed to load data!"}
      ></ErrorAlert>
    );

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full gap-2 mb-20">
        <UserCircle02Icon size={60} />
        <h3 className="mb-5 font-semibold text-xl">{user?.email}</h3>
      </div>

      <div className="mt-5">
        <ul className="grid grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <div className="flex flex-col col-span-3">
              <div className="block mx-auto">
                You haven't written any blogs yet.
              </div>
              <Link className="btn btn-primary mx-auto mt-10" to="/write">
                Write your first blog
              </Link>
            </div>
          ) : (
            blogs.map((blog) => <BlogColumnCard key={blog.id} blog={blog} />)
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
