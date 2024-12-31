import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import {
  getAllBlogs,
  getBlogListByQuery,
  searchBlogs,
} from "src/services/blogServices";
import Loading from "src/components/global/Loading";
import ErrorAlert from "src/components/global/ErrorAlert";
import BlogCard from "src/components/blog/BlogCard";
import { blogs_data } from "src/data/blog";
import NotFound from "src/components/global/NotFound";
import { where } from "firebase/firestore";
import { useParams } from "react-router";
import { getSingleUser } from "src/services/userServices";
import { TUser } from "src/types/user";

const Profile = () => {
  const params = useParams();

  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false); // Add loading state for search

  const [user, setUser] = useState<TUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const blogsPerPage = 6;

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

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchLoading(true);

    if (query) {
      const blogs = await searchBlogs(query);
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs([]);
    }

    setSearchLoading(false);
  };

  if (userLoading) return <Loading />;
  if (userError) return <ErrorAlert text={userError} />;

  if (loading && page === 1) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0 && !loading)
    return <NotFound text={blogs_data.all.not_found} />;

  return (
    <div className="min-h-96">
      <div className="mb-20 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 text-3xl">
          {user?.email.substring(0, 1).toUpperCase()}
        </div>
        <div className="c-gray text-2xl font-semibold">{user?.email}</div>
      </div>

      <div className="flex justify-between items-center bg-white z-10">
        <h2>User BLogs</h2>
        <div className="relative">
          <input
            className="input h-10 outline-1 outline-slate-300 w-80 focus-visible:outline-none"
            type="text"
            placeholder="Search blog title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchLoading && (
            <div className="text-center absolute top-2.5 end-3">
              <div className="loading loading-spinner loading-sm" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-8">
        {(searchQuery ? filteredBlogs : blogs).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {!searchQuery && blogs.length % blogsPerPage === 0 && (
        <div className="text-center mt-8">
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
