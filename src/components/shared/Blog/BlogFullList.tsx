import { TBlog } from "src/types/blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { TFetchingWithLoadMore } from "src/types/states";
import { TFetchingWithLoadMoreAction } from "src/types/actions";
import { Dispatch } from "react";
import RenderState from "../RenderState";
import LoadMoreButton from "src/components/Buttons/LoadMoreButton";

type Props = {
  searchQuery: string;
  filteredBlogs: TBlog[];
  state: TFetchingWithLoadMore<TBlog[]>;
  dispatch: Dispatch<TFetchingWithLoadMoreAction<TBlog[]>>;
};

const BlogFullList = ({ state, filteredBlogs, searchQuery, dispatch }: Props) => {
  const { data: blogs, error, loading } = state;

  const skeleton = [1, 2, 3];

  return (
    <div>
      <div className="bc-gray">
        <div className="max-w-[1440px] px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8 mx-auto">
          <RenderState
            error={error}
            loading={loading}
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
