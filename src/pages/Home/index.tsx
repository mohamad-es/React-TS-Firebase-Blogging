import { orderBy, limit } from "firebase/firestore";
import BlogFullList from "src/components/shared/Blog/BlogFullList";
import FeaturedBlog from "./_components/FeaturedBlog";
import BlogFullListHeader from "src/components/shared/Blog/BlogFullListHeader";
import { useAllBlogs } from "src/hooks/blog/useAllBlogs";
import { useRef } from "react";
import { TBlog } from "src/types/blog";

const Home = () => {
  const ref = useRef<{
    fitleredBlogs: TBlog[];
    searchQuery: string;
  }>(null);
  const { state, dispatch } = useAllBlogs([orderBy("create_time", "desc"), limit(6)]);

  return (
    <div className="flex flex-col bg-white">
      <FeaturedBlog />

      <div className="py-3 md:sticky top-[64px] border-b bg-white px-10 z-10">
        <BlogFullListHeader state={state} ref={ref} />
      </div>

      <BlogFullList
        filteredBlogs={ref.current?.fitleredBlogs}
        searchQuery={ref.current?.searchQuery}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Home;
