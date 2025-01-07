import { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
  className?: string;
};

const SubmitButton = ({ loading, className, children }: Props) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      type={loading ? "button" : "submit"}
    >
      {loading ? <div className="loading loading-bars loading-xs" /> : children}
    </button>
  );
};

export default SubmitButton;
