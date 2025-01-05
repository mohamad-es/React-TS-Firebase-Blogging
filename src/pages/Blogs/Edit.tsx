import { doc, updateDoc } from "firebase/firestore";
import { CheckmarkCircle02Icon, EyeIcon } from "hugeicons-react";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import RichTextEditor from "src/components/RichTextEditor";
import { auth, db } from "src/config/firebaseConfig";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { toastInstance } from "src/utils/Toast";

const EditBlog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null); // Base64 image
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const modalsRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    getSingleBlog({
      blogId: params.blogid!,
      setBlog,
      setError,
      setLoading,
    });
  }, []);

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTitle(blog.title);
      setImage(blog.img || null);
    }
  }, [blog]);

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

  const updateBlog = async () => {
    if (!title || !content) {
      toastInstance({
        text: "Please fill out the title and content",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const blogRef = doc(db, "blogs", params.blogid!);
      await updateDoc(blogRef, {
        title,
        content,
        img: image, // Save Base64 image
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        update_time: new Date(),
      });
      setLoading(false);
      toastInstance({
        text: "Blog successfully updated",
        type: "success",
      });
      navigate(`/blog/${blog?.id}`);
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

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;

  return (
    <div>
      <form onSubmit={handleSubmit(updateBlog)} className="w-full">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-9 border bc-gray rounded-xl p-10">
            {/* Image Upload Input */}
            <div>
              {image ? (
                <div>
                  <div className="flex gap-5">
                    <div className="relative w-40 h-10">
                      <label
                        htmlFor="upload-banner"
                        className="btn btn-outline absolute start-0 top-0 w-full h-full z-10"
                      >
                        Change banner
                      </label>

                      <input
                        id="upload-banner"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="h-full w-full opacity-0 absolute start-0 top-0"
                      />
                    </div>
                    <button
                      className="text-red-500 font-medium"
                      onClick={() => setImage(null)}
                    >
                      Remove banner
                    </button>
                  </div>
                  <img
                    src={image}
                    alt="Preview"
                    className="w-64 h-28 object-contain rounded-lg mt-5 border"
                  />
                </div>
              ) : (
                <div className="relative h-16 w-64">
                  <label
                    htmlFor="upload-banner"
                    className="btn btn-outline absolute start-0 top-0 w-full h-full z-10"
                  >
                    Add banner for your blog
                  </label>

                  <input
                    id="upload-banner"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="h-full opacity-0 absolute start-0 top-0"
                  />
                </div>
              )}
            </div>

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
          <div className="col-span-3 sticky top-28 left-0">
            <div className="flex gap-2 mb-5">
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
            <ul className="list-disc mt-10">
              <li className="text-sm">
                Upload Blog Image (optional, max 100KB)
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;