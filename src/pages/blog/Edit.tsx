import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import EditBlogSkeleton from "./_components/EditBlogSkeleton";
import BlogEditor from "src/components/shared/Blog/BlogEditor";
import WriteFormSidebar from "./_components/WriteFormSidebar";
import Modal from "src/components/custom/Modal";
import Preview from "src/components/editor/Preview";
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
    <Fragment>
      <RenderState error={error} loading={loading} loadingRender={<EditBlogSkeleton />}>
        <form onSubmit={handleSubmit(submitUpdateBlog)} className="w-screen max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
            <div className="col-span-8 bg-white border rounded-xl">
              {/* <ImageUploader dispatch={updateDispatch} state={updateStates} /> */}

              <BlogEditor dispatch={updateDispatch} state={updateStates} />
            </div>

            <div className="col-span-4 sticky top-28 left-0">
              <WriteFormSidebar loading={updateStates.loading} modalsRef={modalsRef} />
            </div>
          </div>
        </form>
      </RenderState>

      <Modal className="max-w-screen-lg pt-0 px-0" modalsRef={modalsRef}>
        <Preview state={updateStates} />
      </Modal>
    </Fragment>
  );
};

export default EditBlog;
