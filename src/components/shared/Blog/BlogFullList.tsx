import { TBlog } from "src/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { TFetchingWithLoadMore } from "src/types/states";
import { TFetchingWithLoadMoreAction } from "src/types/actions";
import { Dispatch, useRef, useEffect } from "react";
import RenderState from "../RenderState";
import LoadMoreButton from "src/components/buttons/LoadMoreButton";

type Props = {
  searchQuery: string;
  filteredBlogs: TBlog[];
  state: TFetchingWithLoadMore<TBlog[]>;
  dispatch: Dispatch<TFetchingWithLoadMoreAction<TBlog[]>>;
};

const BlogFullList = ({ state, filteredBlogs, searchQuery, dispatch }: Props) => {
  const { data: blogs, error, loading } = state;
  const isInitialFetch = useRef(true);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      isInitialFetch.current = false;
    }
  }, [blogs]);

  const skeleton = [1, 2, 3];

  return (
    <div>
      <div className="bc-gray">
        <div className="max-w-[1440px] px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-8 mx-auto">
          <RenderState
            error={error}
            loading={loading && isInitialFetch.current}
            data={blogs}
            loadingRender={skeleton.map((value) => (
              <BlogCardSkeleton key={value} />
            ))}
          >
            {(searchQuery ? filteredBlogs : blogs)?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </RenderState>
        </div>
      </div>

      {blogs?.length !== 0 && <LoadMoreButton dispatch={dispatch} state={state} searchQuery={searchQuery} />}
    </div>
  );
};

export default BlogFullList;