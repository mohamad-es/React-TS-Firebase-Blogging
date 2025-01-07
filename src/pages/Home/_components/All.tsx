import { limit, orderBy } from "firebase/firestore";
import { useState } from "react";
import BlogCard from "src/components/Blog/BlogCard";
import LoadingButton from "src/components/Buttons/LoadingButton";
import Search from "src/components/Form/Search";
import { blogs_data } from "src/data/blog";
import { searchBlogs } from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { useFetchBlogs } from "src/hooks/useBlog";
import RenderState from "src/components/Custom/RenderState";

const AllBlogs = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);

  const {
    blogs,
    error,
    loadMoreLoading,
    loading,
    blogsPerPage,
    setPage,
    page,
  } = useFetchBlogs({
    filterQuery: [orderBy("create_time", "desc"), limit(6)],
  });

  return (
    <div className="min-h-96">
      <RenderState
        loading={loading && page === 1}
        error={error}
        data={blogs.length}
        emptyListText={blogs_data.all.not_found}
      >
        <div className="flex justify-between sticky top-[69px] py-3 items-center bg-white z-10">
          <h2>{blogs_data.all.title}</h2>

          <Search
            searchData={searchBlogs}
            searchQuery={searchQuery}
            setFiltered={setFilteredBlogs}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {(searchQuery ? filteredBlogs : blogs).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <LoadingButton
          blogsPerPage={blogsPerPage}
          data={blogs}
          loadMoreLoading={loadMoreLoading}
          searchQuery={searchQuery}
          setPage={setPage}
        />
      </RenderState>
    </div>
  );
};

export default AllBlogs;
