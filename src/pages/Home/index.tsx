import AllBlogs from "./_components/All";
import FeaturedBlog from "./_components/FeaturedBlog";

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <FeaturedBlog />
      <AllBlogs />
    </div>
  );
};

export default Home;
