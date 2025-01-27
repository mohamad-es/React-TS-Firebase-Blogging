import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "src/config/firebaseConfig";
import { deleteBlog } from "src/services/blog/deleteBlog";
import { successToast } from "src/utils/Toast";

export const useDeleteBlog = (blogId: string) => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteBlogSubmit = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    setBtnLoading(true);

    try {
      await deleteBlog(blogId);
      setBtnLoading(false);
      successToast("Blog deleted successfully!");
      navigate(`/${auth.currentUser?.uid}`);
    } catch (err) {
      setBtnLoading(false);
    }
  };

  return { deleteBlogSubmit, btnLoading };
};