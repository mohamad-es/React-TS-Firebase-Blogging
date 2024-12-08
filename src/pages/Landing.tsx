import { useEffect, useState } from "react";
import api from "src/services/api";
import { TBlog } from "src/types/blog";
import banner from "src/assets/banner.webp";

type TBlogsData = {
  data: {
    documents: TBlog[];
  };
};

const Landing = () => {
  const [blogs, setBlogs] = useState<null | TBlogsData>(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      const getBlogs = await api.get("/blogs");
      setBlogs(getBlogs);
      return getBlogs;
    };

    fetchBlogs();
  }, []);

  return (
    <div className="panel">
      {!blogs ? (
        <div>loading ...</div>
      ) : blogs?.data.documents.length === 0 ? (
        <div>There is no blog added yet</div>
      ) : (
        <div className="space-y-3">
          <h1 className="text-3xl">Latest Blogs</h1>
          {blogs.data.documents.map((item) => (
            <div
              key={item.name}
              className="border-b px-3 py-5  gap-5 last-of-type:border-none"
            >
              <div className=" mb-3 h-32 overflow-hidden rounded-md w-full">
                <img
                  src={banner}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h3 className="text-2xl">{item.fields.title.stringValue}</h3>
                <p className="text-sm text-gray-500">{item.createTime}</p>
                <div className="text-sm mt-2 line-clamp-4 text-gray-800">
                  {item.fields.content.stringValue}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;
