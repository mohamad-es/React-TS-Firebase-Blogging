import { limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TBlog } from "src/types/blog";
import { getBlogListByQuery } from "src/services/blogServices";
import Loading from "src/components/global/Loading";
import { home_data } from "src/data/home";
import ErrorAlert from "src/components/global/ErrorAlert";
import NotFound from "src/components/global/NotFound";
import BlogCard from "src/components/blog/BlogCard";
import { Image01Icon } from "hugeicons-react";
import AllBlogs from "./Blogs/All";

const Home = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogListByQuery({
      filterQuery: [orderBy("create_time", "desc"), limit(3)],
      setBlogs,
      setError,
      setLoading,
    });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;
  if (blogs.length === 0)
    return <NotFound text={home_data.latest_blogs.not_found} />;

  return (
    <div>
      <div className="flex gap-16 mb-20">
        <div className="flex-1">
          <h3>Featured Post</h3>
          <h1 className="mt-6 mb-14">The Future of Web Development in 2025</h1>
          <p>
            Explore the latest trends and technologies shaping the future of web
            development. From AI-powered tools to new frameworks.
          </p>
          <div className="flex items-center gap-4 mt-12">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
              A
            </div>
            <div>
              <div>Mohammad Esmaeilpour</div>
              <div>2 jun 2025</div>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="rounded-2xl bg-gray-100 flex items-center justify-center h-full">
            <Image01Icon size={200} />
          </div>
        </div>
      </div>

      <AllBlogs />
    </div>
  );
};

export default Home;
