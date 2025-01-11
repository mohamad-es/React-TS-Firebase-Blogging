import { useForm } from "react-hook-form";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "src/components/Form/ImageUploader";
import { useCreateBlog } from "src/hooks/useBlog";
import WriteFormSidebar from "./_components/WriteFormSidebar";
import BlogEditor from "src/components/Blog/BlogEditor";

const WriteBlog = () => {
  const { handleSubmit } = useForm();
  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { createBlog, title, image, content, loading, setContent, setImage, setTitle } = useCreateBlog();

  return (
    <form onSubmit={handleSubmit(createBlog)} className="w-screen max-w-[1440px] mx-auto">
      <div className="grid grid-cols-12 relative pt-10 gap-10 items-start">
        <div className="col-span-9 border bg-white rounded-xl p-10">
          <ImageUploader image={image} setImage={setImage} />

          <BlogEditor content={content} setContent={setContent} setTitle={setTitle} title={title} />
        </div>

        <div className="col-span-3 sticky top-28 left-0">
          <WriteFormSidebar loading={loading} modalsRef={modalsRef} />
        </div>
      </div>
    </form>
  );
};

export default WriteBlog;
