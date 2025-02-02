import { FileNotFoundIcon } from "hugeicons-react";

type Props = {
  text: string;
};

const ErrorEmptyList = ({ text }: Props) => {
  return (
    <div className="flex-1 justify-center items-center flex">
      <div className="flex flex-col justify-center items-center gap-10">
        <FileNotFoundIcon size={100} />
        <div>{text}</div>
      </div>
    </div>
  );
};

export default ErrorEmptyList;
