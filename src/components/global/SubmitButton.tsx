import { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
};

const SubmitButton = ({ loading, children }: Props) => {
  return (
    <div className="relative">
      {loading ? (
        <button
          className="btn btn-primary w-full flex justify-center items-center"
          type="button"
        >
          <div className="loading loading-bars loading-xs" />
        </button>
      ) : (
        <button className="btn btn-primary w-full">{children}</button>
      )}
    </div>
  );
};

export default SubmitButton;
