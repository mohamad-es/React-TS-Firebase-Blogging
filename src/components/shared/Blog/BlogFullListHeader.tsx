import Search from "../../form/Search";
import { Dispatch, SetStateAction } from "react";
import { TBlog } from "src/types/blog";
import { blogs_data } from "src/data/blog";
import SearchSkeleton from "../../skeleton/SearchSkeleton";
import { TFetchingWithLoadMore } from "src/types/states";
import { searchBlogs } from "src/utils/searchBlogs";

type Props = {
  setFilteredBlogs: Dispatch<SetStateAction<TBlog[]>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  state: TFetchingWithLoadMore<TBlog[]>;
};

const BlogFullListHeader = ({ state, setFilteredBlogs, searchQuery, setSearchQuery }: Props) => {
  const { loading, page } = state;
  return (
    <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between">
      <h2>{blogs_data.all.title}</h2>

      {loading && page === 1 ? (
        <SearchSkeleton />
      ) : (
        <Search
          searchData={searchBlogs}
          searchQuery={searchQuery}
          setFiltered={setFilteredBlogs}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
};

export default BlogFullListHeader;
