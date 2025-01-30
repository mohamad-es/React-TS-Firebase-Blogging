import { useParams } from "react-router";
import Preview from "src/components/editor/Preview";
import { useReadBlog } from "src/hooks/blog/useReadBlog";
import RenderState from "src/components/shared/RenderState";
import ReadBlogSkeleton from "../../components/skeleton/ReadBlogSkeleton";
import ReadFormSidebar from "./_components/ReadFormSidebar";

const ReadBlog = () => {
  const params = useParams();
  const { state } = useReadBlog(params.blogid!);
  const { data: blog, error, loading } = state;

  return (
    <RenderState error={error} loading={loading} data={blog} loadingRender={<ReadBlogSkeleton />}>
      <div className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative gap-10 pt-10">
          <div className="col-span-8 border rounded-xl overflow-hidden">
            <div className="bg-white pb-10">
              <Preview state={state} />
            </div>
          </div>
          <ReadFormSidebar blog={blog!} />
        </div>
      </div>
    </RenderState>
  );
};

export default ReadBlog;
