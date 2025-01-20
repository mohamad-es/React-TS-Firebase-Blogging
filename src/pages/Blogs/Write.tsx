import { useForm } from "react-hook-form";
import { Fragment, useRef } from "react";
import ImageUploader from "src/components/Form/ImageUploader";
import WriteFormSidebar from "./_components/WriteFormSidebar";
import BlogEditor from "src/components/Blog/BlogEditor";
import Modal from "src/components/Custom/Modal";
import Preview from "src/components/Editor/Preview";
import { useCreateBlog } from "src/hooks/Blog/useCreateBlog";

const WriteBlog = () => {
  const { handleSubmit } = useForm();
  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { createBlog, title, image, content, loading, setContent, setImage, setTitle } = useCreateBlog();

  return (
    <Fragment>
      <form onSubmit={handleSubmit(createBlog)} className="w-screen max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
          <div className="col-span-8 border bg-white rounded-xl ">
            <ImageUploader image={image} setImage={setImage} />

            <BlogEditor content={content} setContent={setContent} setTitle={setTitle} title={title} />
          </div>

          <div className="col-span-4 sticky top-28 left-0">
            <WriteFormSidebar loading={loading} modalsRef={modalsRef} />
          </div>
        </div>
      </form>

      <Modal className="max-w-screen-xl min-h-44 pt-0 px-0" modalsRef={modalsRef}>
        <Preview title={title} content={content} img={image || ""} />
      </Modal>
    </Fragment>
  );
};

export default WriteBlog;
