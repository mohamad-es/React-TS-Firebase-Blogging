import { useFetchBlogs } from "src/hooks/useBlog";
import { TBlog } from "src/types/blog";
import LoadingButton from "../Buttons/LoadingButton";
import ErrorMessage from "../Custom/ErrorMessage";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

type Props<T> = {
  filterQuery: T[];
  searchQuery: string;
  filteredBlogs: TBlog[];
};

const BlogFullList = <T,>({
  filterQuery,
  filteredBlogs,
  searchQuery,
}: Props<T>) => {
  const skeleton = [1, 2, 3, 4, 5, 6];

  const {
    blogs,
    error,
    loadMoreLoading,
    loading,
    blogsPerPage,
    setPage,
    page,
  } = useFetchBlogs({
    filterQuery,
  });

  return (
    <div>
      <div className="bc-gray min-h-96">
        <div className="max-w-[1440px] grid grid-cols-3 gap-8 pt-8 mx-auto">
          {loading && page === 1 ? (
            skeleton.map((item) => <BlogCardSkeleton key={item} />)
          ) : error ? (
            <ErrorMessage text={error} />
          ) : (
            (searchQuery ? filteredBlogs : blogs).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          )}
        </div>
      </div>

      <LoadingButton
        blogsPerPage={blogsPerPage}
        data={blogs}
        loadMoreLoading={loadMoreLoading}
        searchQuery={searchQuery}
        setPage={setPage}
      />
    </div>
  );
};

export default BlogFullList;
