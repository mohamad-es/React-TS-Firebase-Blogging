import { toast } from "react-toastify";

const successToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export { errorToast, successToast };
