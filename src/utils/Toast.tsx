import { toast } from "react-toastify";

type Props = {
  text: string;
  type: "success" | "error";
};

export const toastInstance = ({ text, type }: Props) => {
  toast[type](text, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

