import { Dispatch, memo, SetStateAction } from "react";
import Search from "src/components/form/Search";
import { blogs_data } from "src/data/blog";
import { TBlog } from "src/types/blog";
import { searchBlogs } from "src/utils/searchBlogs";

type Props = {
  searchQuery: string;
  setFilteredBlogs: Dispatch<SetStateAction<TBlog[]>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const BlogFullListHeaderCore = ({ searchQuery, setFilteredBlogs, setSearchQuery }: Props) => {
  return (
    <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between">
      <h2>{blogs_data.all.title}</h2>

      <Search<TBlog>
        searchData={searchBlogs}
        searchQuery={searchQuery}
        setFiltered={setFilteredBlogs}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export const BlogFullListHeader = memo(BlogFullListHeaderCore);
