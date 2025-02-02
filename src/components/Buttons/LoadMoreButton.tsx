import { Dispatch } from "react";
import { TFetchingWithLoadMoreAction } from "src/types/actions";
import { TBlog } from "src/types/blog";
import { TFetchingWithLoadMore } from "src/types/states";

type Props<T> = {
  searchQuery: string | undefined;
  state: TFetchingWithLoadMore<TBlog[]>;
  dispatch: Dispatch<TFetchingWithLoadMoreAction<T>> | Dispatch<TFetchingWithLoadMoreAction<T>>;
};

const LoadMoreButton = <T,>({ searchQuery, dispatch, state }: Props<T>) => {
  const { data, blogsPerPage, loadMoreLoading } = state;

  return (
    data &&
    !searchQuery &&
    data.length % blogsPerPage === 0 && (
      <div className="text-center bc-gray pt-10">
        <button
          onClick={() => dispatch({ type: "LOAD_MORE" })}
          disabled={loadMoreLoading}
          className={`btn border-gray-300 ${loadMoreLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loadMoreLoading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : (
            <div className="flex gap-2 w-full justify-between items-center">Load More</div>
          )}
        </button>
      </div>
    )
  );
};

export default LoadMoreButton;
