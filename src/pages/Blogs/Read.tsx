import { useParams } from "react-router";
import Preview from "src/components/Editor/Preview";
import { useFetchSingleBlog } from "src/hooks/useBlog";
import RenderState from "src/components/Custom/RenderState";
import ReadFormSidebar from "./_components/ReadFormSidebar";
import { TBlog } from "src/types/blog";

const ReadBlog = () => {
  const params = useParams();
  const { blog, error, loading } = useFetchSingleBlog(params.blogid!);

  return (
    <RenderState<TBlog> loading={loading} error={error} data={blog}>
      <div className="grid grid-cols-12 relative gap-10">
        <div className="col-span-9 bg-gray-50 rounded-xl overflow-hidden">
          <img src={blog?.img} alt="" className="w-full h-64 object-contain" />
          <div className="p-10">
            <h1 className="text-3xl font-extrabold mb-10">{blog?.title}</h1>
            <Preview content={blog?.content!} />
          </div>
        </div>

        <ReadFormSidebar blog={blog} />
      </div>
    </RenderState>
  );
};

export default ReadBlog;
