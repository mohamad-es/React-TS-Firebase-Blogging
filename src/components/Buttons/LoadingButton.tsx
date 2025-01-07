import { Dispatch, SetStateAction } from "react";

type Props<T> = {
  searchQuery: string;
  data: T[];
  blogsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  loadMoreLoading: boolean;
};

const LoadingButton = <T,>({
  searchQuery,
  data,
  blogsPerPage,
  setPage,
  loadMoreLoading,
}: Props<T>) => {
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    !searchQuery &&
    data.length % blogsPerPage === 0 && (
      <div className="text-center mt-10">
        <button
          onClick={loadMore}
          disabled={loadMoreLoading}
          className={`border rounded-xl py-2 px-3 transition-all hover:bg-blue-700 hover:text-white text-sm ${
            loadMoreLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loadMoreLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    )
  );
};

export default LoadingButton;
