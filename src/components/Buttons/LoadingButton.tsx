import { Loading03Icon } from "hugeicons-react";
import { Dispatch, SetStateAction } from "react";

type Props<T> = {
  searchQuery: string;
  data: T[];
  blogsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  loadMoreLoading: boolean;
};

const LoadingButton = <T,>({ searchQuery, data, blogsPerPage, setPage, loadMoreLoading }: Props<T>) => {
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
          className={`border btn btn-primary w-36 rounded-xl transition-all${
            loadMoreLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loadMoreLoading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : (
            <div className="flex w-full justify-between items-center">
              Load More
              <Loading03Icon />
            </div>
          )}
        </button>
      </div>
    )
  );
};

export default LoadingButton;
