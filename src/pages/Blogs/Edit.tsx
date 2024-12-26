import { collection, doc, updateDoc } from "firebase/firestore";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import { auth, db } from "src/config/firebaseConfig";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";
import { toastInstance } from "src/utils/Toast";

const EditBlog = () => {
  const params = useParams();

  const navigate = useNavigate();
  const { register, handleSubmit,setValue } = useForm();

  const [content, setContent] = useState("");
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getSingleBlog({
      blogId: params.blogid!,
      setBlog,
      setError,
      setLoading,
    });
  }, []);

  useEffect(() => {
    setContent(blog?.content!);
  }, [blog]);

  const updateBlog = async (values: FieldValues) => {
    setLoading(true);
    try {
      const blogRef = doc(db, "blogs", params.blogid!);
      await updateDoc(blogRef, {
        title: values.title,
        content,
        user_id: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      setLoading(false);
      toastInstance({
        text: "Blog successfully updated",
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

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;

  setValue("title", blog?.title);
  

  return (
    <div>
      <form onSubmit={handleSubmit(updateBlog)} className="w-full">
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

export default EditBlog;
