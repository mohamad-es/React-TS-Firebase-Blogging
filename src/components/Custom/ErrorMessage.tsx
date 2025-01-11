import { SettingError03Icon } from "hugeicons-react";

type Props = {
  text: string;
};
const ErrorMessage = ({ text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 break-all py-20">
      <SettingError03Icon size={100} />
      <div className="text-wrap break-words">{text}</div>
    </div>
  );
};

export default ErrorMessage;
