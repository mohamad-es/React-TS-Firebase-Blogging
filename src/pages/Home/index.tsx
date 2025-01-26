import { orderBy, limit } from "firebase/firestore";
import BlogFullList from "src/components/Blog/BlogFullList";
import FeaturedBlog from "./_components/FeaturedBlog";
import BlogFullListHeader from "src/components/Blog/BlogFullListHeader";
import { useState } from "react";
import { TBlog } from "src/types/blog";
import { useAllBlogs } from "src/hooks/blog/useAllBlogs";

const Home = () => {
  const [fitleredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { state, dispatch } = useAllBlogs([orderBy("create_time", "desc"), limit(6)]);

  return (
    <div className="flex flex-col bg-white">
      <FeaturedBlog />

      <div className="py-3 md:sticky top-[64px] border-b bg-white px-10 z-10">
        <BlogFullListHeader
          state={state}
          setFilteredBlogs={setFilteredBlogs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <BlogFullList filteredBlogs={fitleredBlogs} searchQuery={searchQuery} state={state} dispatch={dispatch} />
    </div>
  );
};

export default Home;
