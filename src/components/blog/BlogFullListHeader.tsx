import Search from "../Form/Search";
import { Dispatch, SetStateAction } from "react";
import { TBlog } from "src/types/blog";
import { blogs_data } from "src/data/blog";
import SearchSkeleton from "../Form/SearchSkeleton";
import { searchBlogs } from "src/services/blog/updateBlog";
import { useFetchBlogs } from "src/hooks/Blog/useBlog";

type Props<T> = {
  setFilteredBlogs: Dispatch<SetStateAction<TBlog[]>>;
  filterQuery: T[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const BlogFullListHeader = <T,>({ setFilteredBlogs, filterQuery, searchQuery, setSearchQuery }: Props<T>) => {
  const { loading, page } = useFetchBlogs({
    filterQuery,
  });

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
