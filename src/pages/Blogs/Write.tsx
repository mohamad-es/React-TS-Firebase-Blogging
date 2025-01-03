import { useForm } from "react-hook-form";
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
  const [image, setImage] = useState<string | null>(null); // Base64 image
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit } = useForm({ mode: "onChange" });
  const modalsRef = useRef<HTMLDialogElement | null>(null);

  // Handle image upload and convert to Base64
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (100KB limit)
      if (file.size > 100 * 1024) {
        toastInstance({
          text: "File size must be less than 100KB",
          type: "error",
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
        toastInstance({
          text: "Failed to upload image",
          type: "error",
        });
      };
    }
  };

  // Create blog post with image
  const createBlog = async () => {
    if (!title || !content) {
      toastInstance({
        text: "Please fill out the title and content",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title,
        content,
        img: image, // Save Base64 image
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

          <button
            type="submit"
            className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-green-600 hover:text-white"
          >
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

          {/* Image Upload Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Blog Image (optional, max 100KB):
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Image Preview:</h3>
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

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