import { useForm } from "react-hook-form";
import { ChangeEvent, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import RichTextEditor from "src/components/Editor/RichTextEditor";
import ImageUploader from "src/components/Form/ImageUploader";
import { useCreateBlog } from "src/hooks/useBlog";
import WriteFormSidebar from "./_components/WriteFormSidebar";

const WriteBlog = () => {
  const { handleSubmit } = useForm();
  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const {
    createBlog,
    title,
    image,
    content,
    loading,
    setContent,
    setImage,
    setTitle,
  } = useCreateBlog();

  return (
    <div>
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-9 border bg-white rounded-xl p-10">
            {/* Image Upload Input */}
            <ImageUploader image={image} setImage={setImage} />

            <div className="flex flex-col gap-10">
              <input
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.currentTarget.value)
                }
                type="text"
                placeholder="Write blog title here ..."
                className="h-16 text-4xl bg-transparent font-bold focus-visible:outline-none outline-none border-none italic"
                value={title}
              />

              <RichTextEditor
                modalsRef={modalsRef}
                setContent={setContent}
                content={content}
                title={title}
              />
            </div>
          </div>

          <WriteFormSidebar loading={loading} modalsRef={modalsRef} />
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
