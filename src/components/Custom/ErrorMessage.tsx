import { SettingError03Icon } from "hugeicons-react";

type Props = {
  text: string;
};
const ErrorMessage = ({ text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 break-all py-10">
      <SettingError03Icon size={100} />
      <div className="text-wrap break-words text-sm">{text}</div>
    </div>
  );
};

export default ErrorMessage;
