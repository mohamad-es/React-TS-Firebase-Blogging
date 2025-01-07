import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import RenderState from "src/components/Custom/RenderState";
import RichTextEditor from "src/components/Editor/RichTextEditor";
import ImageUploader from "src/components/Form/ImageUploader";
import { auth } from "src/config/firebaseConfig";
import { useFetchSingleBlog, useUpdateBlog } from "src/hooks/useBlog";
import { updateBlog } from "src/services/blogServices";
import EditFormSidebar from "./_components/EditFormSidebar";

const EditBlog = () => {
  const params = useParams();
  const { handleSubmit } = useForm();

  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const { blog, error, loading } = useFetchSingleBlog(params.blogid!);

  const { content, image, title, setImage, setContent, setTitle } =
    useUpdateBlog(blog!);

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
    <RenderState error={error} loading={loading}>
      <form onSubmit={handleSubmit(submitUpdateBlog)} className="w-full">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-9 border bc-gray rounded-xl p-10">
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

          <EditFormSidebar loading={loading} modalsRef={modalsRef} />
        </div>
      </form>
    </RenderState>
  );
};

export default EditBlog;
