import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "src/config/firebaseConfig";
import { useNavigate } from "react-router";
import { toastInstance } from "src/utils/Toast";
import { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { CheckmarkBadge01Icon, CheckmarkCircle02Icon } from "hugeicons-react";

const WriteBlog = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const createBlog = async (values: FieldValues) => {
    setLoading(true);
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title: values.title,
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

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex justify-end mb-5">
          <button className="btn btn-primary font-medium px-3">
            {loading ? (
              <div className="loading loading-infinity" />
            ) : (
              <Fragment>
                Publish
                <CheckmarkCircle02Icon size={20} />
              </Fragment>
            )}
          </button>
        </div>
        <div className="flex flex-col">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="New blog title here..."
            className="h-16 text-4xl font-bold focus-visible:outline-none outline-none border-none"
          />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            className="mt-10"
            placeholder="your content here ..."
          />
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
