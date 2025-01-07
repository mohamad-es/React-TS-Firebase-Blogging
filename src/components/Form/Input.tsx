import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TInput } from "src/types/global";

type Props = {
  input: TInput;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const Input = ({ errors, input, register }: Props) => {
  const { label, name, pattern, placeholder, required } = input;
  return (
    <div className="flex flex-col">
      <label className="mb-2">{label}</label>
      <input
        {...register(name, { required, pattern })}
        className="placeholder:text-sm h-10"
        placeholder={placeholder}
        autoComplete="off"
      />
      <div className="text-red-500 text-sm mt-2">
        {errors[name]?.message as string}
      </div>
    </div>
  );
};

export default Input;
