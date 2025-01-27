import { useParams } from "react-router";
import Preview from "src/components/Editor/Preview";
import ReadFormSidebar from "./_components/ReadFormSidebar";
import { Image01Icon } from "hugeicons-react";
import ReadBlogSkeleton from "./_components/ReadBlogSkeleton";
import { useReadBlog } from "src/hooks/blog/useReadBlog";
import RenderState from "src/components/shared/RenderState";
import { TCreateBlogState } from "src/types/states";

const ReadBlog = () => {
  const params = useParams();
  const { state } = useReadBlog(params.blogid!);
  const { data: blog, error, loading } = state;

  return (
    <RenderState error={error} loading={loading} loadingRender={<ReadBlogSkeleton />}>
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
            <div className="bg-white pb-10">
              <Preview state={state.data as TCreateBlogState} />
            </div>
          </div>
          <ReadFormSidebar blog={blog!} />
        </div>
      </div>
    </RenderState>
  );
};

export default ReadBlog;
