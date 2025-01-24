import { More01Icon } from "hugeicons-react";
import { Dispatch } from "react";

type Props<T> = {
  searchQuery: string;
  dispatch: Dispatch<T>;
};

const LoadingButton = <T,>({ searchQuery, dispatch }: Props<T>) => {
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    !searchQuery &&
    data.length % blogsPerPage === 0 && (
      <div className="text-center bc-gray pt-10">
        <button
          onClick={loadMore}
          disabled={loadMoreLoading}
          className={`btn border-gray-300 ${loadMoreLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loadMoreLoading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : (
            <div className="flex gap-2 w-full justify-between items-center">
              Load More
              <More01Icon size={20} />
            </div>
          )}
        </button>
      </div>
    )
  );
};

export default LoadingButton;
