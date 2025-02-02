import { CheckmarkCircle02Icon } from "hugeicons-react";
import { ReactNode } from "react";

type Props = {
  loading: boolean | null;
  title: string;
  className?: string;
  icon?: ReactNode;
  submitFn?: () => void;
};

const SubmitButton = ({ loading, className, title, submitFn, icon = <CheckmarkCircle02Icon size={22} /> }: Props) => {
  return (
    <button
      onClick={() => submitFn && submitFn()}
      className={`btn btn-primary items-center ${className}`}
      type={loading ? "button" : "submit"}
    >
      {title}
      {loading ? <div className="loading loading-xs loading-spinner" /> : icon}
    </button>
  );
};

export default SubmitButton;
