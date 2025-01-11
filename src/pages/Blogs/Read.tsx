import { useParams } from "react-router";
import Preview from "src/components/Editor/Preview";
import { useFetchSingleBlog } from "src/hooks/useBlog";
import RenderState from "src/components/Custom/RenderState";
import ReadFormSidebar from "./_components/ReadFormSidebar";
import { TBlog } from "src/types/blog";
import { Image01Icon } from "hugeicons-react";
import ReadBlogSkeleton from "./_components/ReadBlogSkeleton";

const ReadBlog = () => {
  const params = useParams();
  const { blog, error, loading } = useFetchSingleBlog(params.blogid!);

  return (
    <RenderState<TBlog> loadingRender={<ReadBlogSkeleton/>} loading={loading} error={error} data={blog}>
      <div className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative gap-10 pt-10">
          <div className="col-span-8 border rounded-xl overflow-hidden">
            {blog?.img ? (
              <img src={blog?.img} alt="" className="w-full h-96 object-cover border-b bg-white" />
            ) : (
              <div className="w-full bg-gray-200 border-b h-96 flex items-center justify-center">
                <Image01Icon size={150} color="gray" />
              </div>
            )}
            <div className="p-10 bg-white">
              <h1 className="text-3xl font-extrabold mb-10">{blog?.title}</h1>
              <Preview content={blog?.content!} />
            </div>
          </div>
          <ReadFormSidebar blog={blog} />
        </div>
      </div>
    </RenderState>
  );
};

export default ReadBlog;
