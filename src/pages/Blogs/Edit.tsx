import { addDoc, collection,doc,updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { db } from "src/config/firebaseConfig";
import { getSingleBlog } from "src/services/blogServices";
import { TBlog } from "src/types/blog";

const EditBlog = () => {
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
      const blogRef = doc(db, "blogs",params.blogid!);
      await updateDoc(blogRef, {
        title: values.title,
        content: values.content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="panel">
      {/* <h1 className="text-xl px-3 mb-10">Write new blog</h1> */}
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex justify-end">
          <button className="btn-green px-3 rounded-lg">
            Publish update ✔
          </button>
        </div>
        <div className="flex flex-col">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="your title here"
            className="h-16 text-2xl border-none"
          />
          <textarea
            {...register("content", { required: true })}
            placeholder="You Content Here"
            className="px-4 mt-4"
            rows={10}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
