import { useFetchBlogs } from "src/hooks/Blog/useBlog";
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

const BlogFullList = <T,>({ filterQuery, filteredBlogs, searchQuery }: Props<T>) => {
  const skeleton = [1, 2, 3];

  const { blogs, error, loadMoreLoading, loading, blogsPerPage, setPage, page } = useFetchBlogs({
    filterQuery,
  });

  return (
    <div>
      <div className="bc-gray">
        <div className="max-w-[1440px] px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8 mx-auto">
          {loading && page === 1 ? (
            skeleton.map((item) => <BlogCardSkeleton key={item} />)
          ) : error ? (
            <ErrorMessage text={error} />
          ) : blogs.length === 0 ? (
            <div>No blog written yet.</div>
          ) : (
            (searchQuery ? filteredBlogs : blogs).map((blog) => <BlogCard key={blog.id} blog={blog} />)
          )}
        </div>
      </div>

      {blogs.length !== 0 && (
        <LoadingButton
          blogsPerPage={blogsPerPage}
          data={blogs}
          loadMoreLoading={loadMoreLoading}
          searchQuery={searchQuery}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default BlogFullList;
