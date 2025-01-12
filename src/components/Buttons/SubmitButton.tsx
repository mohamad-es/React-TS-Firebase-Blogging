import { CheckmarkCircle02Icon } from "hugeicons-react";
import { ReactNode } from "react";

type Props = {
  loading: boolean;
  title: ReactNode;
  className?: string;
};

const SubmitButton = ({ loading, className, title }: Props) => {
  return (
    <button className={`btn ${className}`} type={loading ? "button" : "submit"}>
      {title}
      {loading ? <div className="loading loading-xs loading-spinner" /> : <CheckmarkCircle02Icon size={20} />}
    </button>
  );
};

export default SubmitButton;
