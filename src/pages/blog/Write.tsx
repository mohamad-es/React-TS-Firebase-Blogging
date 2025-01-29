import { useForm } from "react-hook-form";
import { Fragment, useRef } from "react";
import ImageUploader from "src/components/shared/ImageUploader";
import WriteFormSidebar from "./_components/WriteFormSidebar";
import BlogEditor from "src/components/shared/Blog/BlogEditor";
import Modal from "src/components/custom/Modal";
import Preview from "src/components/editor/Preview";
import { useCreateBlog } from "src/hooks/blog/useCreateBlog";

const WriteBlog = () => {
  const { handleSubmit } = useForm();
  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { createBlogSubmit, dispatch, state } = useCreateBlog();

  return (
    <Fragment>
      <form onSubmit={handleSubmit(createBlogSubmit)} className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
          <div className="col-span-8 border bg-white rounded-xl ">
            <ImageUploader state={state} dispatch={dispatch} />

            <BlogEditor state={state} dispatch={dispatch} />
          </div>

          <div className="col-span-4 sticky top-28 left-0">
            <WriteFormSidebar loading={state.loading as boolean} modalsRef={modalsRef} />
          </div>
        </div>
      </form>

      <Modal className="max-w-screen-xl min-h-44 pt-0 px-0" modalsRef={modalsRef}>
        <Preview state={state} />
      </Modal>
    </Fragment>
  );
};

export default WriteBlog;
