import { CheckmarkCircle02Icon } from "hugeicons-react";
import { ReactNode } from "react";

type Props = {
  loading: boolean;
  title: ReactNode;
  className?: string;
};

const SubmitButton = ({ loading, className, title }: Props) => {
  return (
    <button className={`btn flex items-center ${className}`} type={loading ? "button" : "submit"}>
      {title}
      {loading ? (
        <div className="loading loading-xs loading-spinner" />
      ) : (
        <CheckmarkCircle02Icon fill="black" color="white" size={22} />
      )}
    </button>
  );
};

export default SubmitButton;
