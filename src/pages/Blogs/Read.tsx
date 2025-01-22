import { useParams } from "react-router";
import Preview from "src/components/Editor/Preview";
import ReadFormSidebar from "./_components/ReadFormSidebar";
import { Image01Icon } from "hugeicons-react";
import ReadBlogSkeleton from "./_components/ReadBlogSkeleton";
import ErrorMessage from "src/components/Custom/ErrorMessage";
import { useSingleBlog } from "src/hooks/Blog/useReadBlog";

const ReadBlog = () => {
  const params = useParams();
  const { state } = useSingleBlog(params.blogid!);
  const { data: blog, error, loading } = state;

  if (loading) return <ReadBlogSkeleton />;
  if (error) return <ErrorMessage text={error} />;
  if (!blog) return <ErrorMessage text="No data found" />;

  return (
    <div className="w-screen max-w-[1440px] mx-auto">
      <div className="grid grid-cols-12 relative gap-10 pt-10">
        <div className="col-span-8 border rounded-xl overflow-hidden">
          {blog.img ? (
            <img src={blog?.img} alt="" className="w-full h-96 object-cover border-b bg-white" />
          ) : (
            <div className="w-full bg-gray-200 border-b h-96 flex items-center justify-center">
              <Image01Icon size={150} color="gray" />
            </div>
          )}
          <div className="bg-white">
            <h1 className="text-3xl p-10 font-extrabold">{blog?.title}</h1>
            <Preview content={blog?.content!} />
          </div>
        </div>
        <ReadFormSidebar blog={blog} />
      </div>
    </div>
  );
};

export default ReadBlog;
