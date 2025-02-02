import { useForm } from "react-hook-form";
import { Fragment, useRef } from "react";
// import ImageUploader from "src/components/shared/ImageUploader";
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
            {/* <ImageUploader<TCreateBlogState>
              state={state}
              dispatch={dispatch}
              img={
                <img src={state.data?.img!} alt="Preview" className="object-cover w-full rounded-xl rounded-b-none" />
              }
              label={
                <label
                  htmlFor="upload-banner"
                  className="w-full h-full cursor-pointer z-20 min-h-96 border-b-2  text-xl left-0 top-0 flex flex-col gap-5 items-center justify-center"
                >
                  <PlusSignIcon size={50} color="gray" />
                  Add banner for your blog
                </label>
              }
            /> */}

            <BlogEditor state={state} dispatch={dispatch} />
          </div>

          <div className="col-span-4 sticky top-28 left-0">
            <WriteFormSidebar loading={state.loading as boolean} modalsRef={modalsRef} />
          </div>
        </div>
      </form>

      <Modal className="max-w-screen-lg min-h-44 pt-0 px-0" modalsRef={modalsRef}>
        <Preview state={state} />
      </Modal>
    </Fragment>
  );
};

export default WriteBlog;
