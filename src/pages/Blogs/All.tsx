import { limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogCard from "src/components/blog/BlogCard";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import NotFound from "src/components/global/NotFound";
import { blogs_data } from "src/data/blog";
import {
  getBlogListByQuery,
  searchBlogs,
} from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false); // Add loading state for search
  const [page, setPage] = useState(1);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false); // Add loading state for load more button
  const blogsPerPage = 6;

  useEffect(() => {
    setLoadMoreLoading(true); // Start load more loading
    getBlogListByQuery({
      setBlogs,
      setError,
      setLoading,
      page,
      blogsPerPage,
      filterQuery: [orderBy("create_time", "desc"), limit(6)],
    }).finally(() => setLoadMoreLoading(false)); // Stop load more loading
  }, [page]);

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

  if (loading && page === 1) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0 && !loading)
    return <NotFound text={blogs_data.all.not_found} />;

  return (
    <div className="min-h-96">
      <div className="flex justify-between sticky top-[69px] py-3 items-center bg-white z-10">
        <h2>{blogs_data.all.title}</h2>

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
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            disabled={loadMoreLoading} // Disable button when loading
            className={`border rounded-xl py-2 px-3 transition-all hover:bg-blue-700 hover:text-white text-sm ${loadMoreLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loadMoreLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
