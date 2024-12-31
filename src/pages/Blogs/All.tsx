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
  const blogsPerPage = 6;

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
      <div className="flex justify-between sticky top-0 py-3 items-center bg-white z-10">
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
              <div className="loading loading-spinner loading-sm"/>
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

export default AllBlogs;
