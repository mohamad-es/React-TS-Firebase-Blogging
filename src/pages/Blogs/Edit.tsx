import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import ImageUploader from "src/components/shared/ImageUploader";
import EditBlogSkeleton from "./_components/EditBlogSkeleton";
import BlogEditor from "src/components/shared/Blog/BlogEditor";
import WriteFormSidebar from "./_components/WriteFormSidebar";
import Modal from "src/components/Custom/Modal";
import Preview from "src/components/Editor/Preview";
import { useReadBlog } from "src/hooks/blog/useReadBlog";
import { useUpdateBlog } from "src/hooks/blog/useUpdateBlog";
import RenderState from "src/components/shared/RenderState";

const EditBlog = () => {
  const params = useParams();
  const { handleSubmit } = useForm();

  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { state } = useReadBlog(params.blogid!);
  const { data: blog, error, loading } = state;

  const { dispatch: updateDispatch, state: updateStates, submitUpdateBlog } = useUpdateBlog(blog!);

  return (
    <RenderState error={error} loading={loading} data={blog} loadingRender={<EditBlogSkeleton />}>
      <form onSubmit={handleSubmit(submitUpdateBlog)} className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
          <div className="col-span-8 bg-white border rounded-xl">
            <ImageUploader dispatch={updateDispatch} state={state} />

            <BlogEditor dispatch={updateDispatch} state={updateStates} />
          </div>

          <div className="col-span-4 sticky top-28 left-0">
            <WriteFormSidebar loading={updateStates.loading as boolean} modalsRef={modalsRef} />
          </div>
        </div>
      </form>

      <Modal className="max-w-screen-lg pt-0 px-0" modalsRef={modalsRef}>
        <Preview state={state} />
      </Modal>
    </RenderState>
  );
};

export default EditBlog;
