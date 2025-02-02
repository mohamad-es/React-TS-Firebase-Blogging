import FeaturedBlog from "./_components/FeaturedBlog";
import { orderBy, limit } from "firebase/firestore";
import { useRef } from "react";
import { BlogFullList, BlogFullListRef } from "src/components/shared/Blog/BlogFullList";
import { BlogFullListHeader } from "src/components/shared/Blog/BlogFullListHeader";

const Home = () => {
  const ref = useRef<BlogFullListRef>(null);

  return (
    <div className="flex flex-col bg-white">
      <FeaturedBlog />

      <div className="py-3 md:sticky top-[64px] border-b bg-white px-10 z-10">
        <BlogFullListHeader
          searchQuery={ref.current?.searchQuery!}
          setFilteredBlogs={ref.current?.setFilteredBlogs!}
          setSearchQuery={ref.current?.setSearchQuery!}
        />
      </div>

      <BlogFullList ref={ref} filterQuery={[orderBy("create_time", "desc"), limit(6)]} />
    </div>
  );
};

export default Home;
