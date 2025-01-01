import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "src/config/firebaseConfig";
import { useNavigate } from "react-router";
import { toastInstance } from "src/utils/Toast";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { CheckmarkCircle02Icon, EyeIcon } from "hugeicons-react";
import RichTextEditor from "src/components/RichTextEditor";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);

  const modalsRef = useRef<HTMLDialogElement | null>(null);

  const createBlog = async () => {
    setLoading(true);
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title,
        content,
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      setLoading(false);
      toastInstance({
        text: "Blog successfully created",
        type: "success",
      });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (error) {
      setLoading(false);
      error instanceof Error
        ? toastInstance({
            text: error.message,
            type: "error",
          })
        : console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex gap-2 justify-end mb-5">
          <button
            type="button"
            onClick={() => modalsRef.current?.showModal()}
            className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-blue-600 hover:text-white"
          >
            Preview
            <EyeIcon size={18} />
          </button>

          <button className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-green-600 hover:text-white">
            {loading ? (
              <div className="loading loading-infinity" />
            ) : (
              <Fragment>
                Publish
                <CheckmarkCircle02Icon size={16} />
              </Fragment>
            )}
          </button>
        </div>
        <div className="flex flex-col gap-10">
          <input
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
            type="text"
            placeholder="Write blog title here ..."
            className="h-16 text-4xl font-bold focus-visible:outline-none outline-none border-none italic"
            value={title}
          />

          <RichTextEditor
            modalsRef={modalsRef}
            setContent={setContent}
            content={content}
            title={title}
          />
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
