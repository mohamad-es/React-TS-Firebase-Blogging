import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TAuthForms } from "src/types/auth";
import auth_banner from "src/assets/auht-banner.png";

type Props = {
  auth_data: TAuthForms;
  submitFunction: SubmitHandler<FieldValues>;
};

const AuthForm = ({ auth_data, submitFunction }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="panel flex justify-between">
      <div>
        <img src={auth_banner} alt="" className="w-80" />
      </div>
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
              />
              <div className="text-red-500 text-sm mt-2">
                {errors[form.name]?.message as string}
              </div>
            </div>
          ))}

          <button className="btn btn-primary mt-3 text-white" type="submit">
            {auth_data.button}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
