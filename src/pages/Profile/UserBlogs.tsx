import { Fragment, useState } from "react";
import BlogCard from "src/components/Blog/BlogCard";
import LoadingButton from "src/components/Buttons/LoadMoreBlogsButton";
import RenderState from "src/components/Custom/RenderState";
import Search from "src/components/Form/Search";
import { profile_data } from "src/data/profile";
import { useUserBlogs } from "src/hooks/user/useUserBlogs";
import { TBlog } from "src/types/blog";
import { searchBlogs } from "src/utils/searchBlogs";

const UserBlogs = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);

  const { state, dispatch } = useUserBlogs();
  const { data: blogs, error, loading, page } = state;

  return (
    <RenderState
      loading={loading && page === 1}
      error={error}
      data={blogs?.length}
      emptyListText={profile_data.not_found}
    >
      {blogs && (
        <Fragment>
          <div className="bg-white border-b w-full sticky top-[64px] py-3 z-10">
            <div className="flex max-w-[1440px] mx-auto justify-between items-center ">
              <h2>{profile_data.title}</h2>
              <Search
                searchData={searchBlogs}
                searchQuery={searchQuery}
                setFiltered={setFilteredBlogs}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-8 w-full max-w-[1440px]">
            {(searchQuery ? filteredBlogs : blogs).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {blogs.length !== 0 && <LoadingButton<TBlog[]> searchQuery={searchQuery} dispatch={dispatch} state={state} />}
        </Fragment>
      )}
    </RenderState>
  );
};

export default UserBlogs;
