import { doc, updateDoc } from "firebase/firestore";
import { CheckmarkBadge01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "src/components/global/ErrorAlert";
import Loading from "src/components/global/Loading";
import { auth, db } from "src/config/firebaseConfig";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const EditBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { register, handleSubmit, setValue } = useForm();

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
      setValue("title", blog?.title);
      setValue("content", blog?.content);
    }
  }, [blog]);

  const createBlog = async (values: FieldValues) => {
    try {
      const blogRef = doc(db, "blogs", params.blogid!);
      await updateDoc(blogRef, {
        title: values.title,
        content: values.content,
      });
      navigate(`/${auth.currentUser?.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorAlert text={error} />;

  return (
    <div className="panel">
      {/* <h1 className="text-xl px-3 mb-10">Write new blog</h1> */}
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex justify-end mb-5">
          <button className="btn btn-success text-white px-3 rounded-lg">
            Publish <CheckmarkBadge01Icon size={20} />
          </button>
        </div>
        <div className="flex flex-col">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="your title here"
            className="h-16 text-2xl border-none outline-none focus-visible:outline-none"
          />
          <textarea
            {...register("content", { required: true })}
            placeholder="You Content Here"
            className="px-4 mt-4 outline-none focus-visible:outline-none"
            rows={10}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
