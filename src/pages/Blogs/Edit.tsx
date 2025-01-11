import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import RenderState from "src/components/Custom/RenderState";
import ImageUploader from "src/components/Form/ImageUploader";
import { auth } from "src/config/firebaseConfig";
import { useFetchSingleBlog, useUpdateBlog } from "src/hooks/useBlog";
import { updateBlog } from "src/services/blogServices";
import EditFormSidebar from "./_components/EditFormSidebar";
import { TBlog } from "src/types/blog";
import EditBlogSkeleton from "./_components/EditBlogSkeleton";
import BlogEditor from "src/components/Blog/BlogEditor";

const EditBlog = () => {
  const params = useParams();
  const { handleSubmit } = useForm();

  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { blog, error, loading } = useFetchSingleBlog(params.blogid!);

  const { content, image, title, setImage, setContent, setTitle } = useUpdateBlog(blog!);

  const submitUpdateBlog = () =>
    updateBlog({
      blogId: params.blogid!,
      updateData: {
        title,
        content,
        img: image,
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        update_time: new Date(),
      },
    });

  return (
    <RenderState<TBlog> error={error} loading={loading} data={blog} loadingRender={<EditBlogSkeleton />}>
      <form onSubmit={handleSubmit(submitUpdateBlog)} className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
          <div className="col-span-8 bg-white border rounded-xl overflow-hidden p-10">
            <ImageUploader image={image} setImage={setImage} />
            <BlogEditor content={content} setContent={setContent} setTitle={setTitle} title={title} />
          </div>

          <div className="col-span-3 sticky top-28 left-0">
            <EditFormSidebar loading={loading} modalsRef={modalsRef} />
          </div>
        </div>
      </form>
    </RenderState>
  );
};

export default EditBlog;
