import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/config/firebaseConfig";
import { useParams } from "react-router";

const WriteBlog = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
  } = useForm();

  const createBlog = async (values: FieldValues) => {
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title: values.title,
        content: values.content,
        userId: params.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="panel">
      {/* <h1 className="text-xl px-3 mb-10">Write new blog</h1> */}
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex justify-end">
          <button className="btn-green px-3 rounded-lg">Publish ✔</button>
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

export default WriteBlog;
