import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "src/config/firebaseConfig";
import { useNavigate, useParams } from "react-router";
import CircleCheckIcon from "src/components/icons/CircleCheckIcon";
import { toastInstance } from "src/utils/Toast";
import { Fragment, useState } from "react";

const WriteBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const createBlog = async (values: FieldValues) => {
    setLoading(true);
    try {
      const blogRef = collection(db, "blogs");
      await addDoc(blogRef, {
        title: values.title,
        content: values.content,
        user_id: params.uid,
        user_email: auth.currentUser?.email,
        create_time: new Date(),
      });
      setLoading(false);
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
    <div className="panel">
      <form onSubmit={handleSubmit(createBlog)} className="w-full">
        <div className="flex justify-end mb-5">
          <button className="btn btn-success w-28 px-1">
            {loading ? (
              <div className="loading loading-infinity" />
            ) : (
              <Fragment>
                Publish
                <CircleCheckIcon size={20} />
              </Fragment>
            )}
          </button>
        </div>
        <div className="flex flex-col">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="your title here"
            className="h-16 text-2xl focus-visible:outline-none outline-none border-none"
          />
          <textarea
            {...register("content", { required: true })}
            placeholder="You Content Here"
            className="px-4 mt-4 focus-visible:outline-none outline-none border-none"
            rows={10}
          />
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
