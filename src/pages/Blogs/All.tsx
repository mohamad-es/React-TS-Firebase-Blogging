import { useEffect, useState } from "react";
import BlogCard from "src/components/blog/BlogCard";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import NotFound from "src/components/global/NotFound";
import { blogs_data } from "src/data/blog";
import { getAllBlogs, searchBlogs } from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false); // Add loading state for search
  const [page, setPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    getAllBlogs({ setBlogs, setError, setLoading, page, blogsPerPage });
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchLoading(true); // Show loading when starting search

    if (query) {
      const blogs = await searchBlogs(query);
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs([]); // Clear the results if the query is empty
    }

    setSearchLoading(false); // Hide loading after search is completed
  };

  if (loading && page === 1) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0 && !loading)
    return <NotFound text={blogs_data.not_found} />;

  return (
    <div>
      <div className="flex justify-between">
        <h2>{blogs_data.title}</h2>
        <input
          className="input h-10 outline-1 outline-slate-300 w-80 focus-visible:outline-none"
          type="text"
          placeholder="Search blog title"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Show loading spinner during search */}
      {searchLoading && (
        // <Loading />
        <div className="text-center fixed end-1/2 top-1/2 mt-4">
          <Loading /> {/* You can customize this with a spinner or text */}
        </div>
      )}

      <div className="grid grid-cols-3 gap-8 mt-8">
        {(searchQuery ? filteredBlogs : blogs).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {blogs.length % blogsPerPage === 0 && (
        <div className="text-center mt-8">
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
