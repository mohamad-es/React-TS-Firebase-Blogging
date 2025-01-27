import { CheckmarkCircle02Icon } from "hugeicons-react";
import { ReactNode } from "react";

type Props = {
  loading: boolean | null;
  title: ReactNode;
  className?: string;
};

const SubmitButton = ({ loading, className, title }: Props) => {
  return (
    <button className={`btn btn-primary items-center ${className}`} type={loading ? "button" : "submit"}>
      {title}
      {loading ? <div className="loading loading-xs loading-spinner" /> : <CheckmarkCircle02Icon size={22} />}
    </button>
  );
};

export default SubmitButton;
