import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "src/components/global/SubmitButton";
import { TAuthForms } from "src/types/auth";

type Props = {
  auth_data: TAuthForms;
  submitFunction: SubmitHandler<FieldValues>;
  loading: boolean;
};

const AuthForm = ({ auth_data, submitFunction, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-96">
        <h1 className="text-3xl mb-7">{auth_data.title}</h1>
        <form
          className="grid gap-5 grid-cols-1 "
          onSubmit={handleSubmit(submitFunction)}
        >
          {auth_data.inputs.map((form) => (
            <div className="flex flex-col">
              <label className="mb-2">{form.label}</label>
              <input
                {...register(form.name, {
                  required: form.required,
                  pattern: form.pattern,
                })}
                className="placeholder:text-sm h-10"
                placeholder={form.placeholder}
                autoComplete="off"
              />
              <div className="text-red-500 text-sm mt-2">
                {errors[form.name]?.message as string}
              </div>
            </div>
          ))}

          <SubmitButton loading={loading}>{auth_data.button}</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
