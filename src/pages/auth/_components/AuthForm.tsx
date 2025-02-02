import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "src/components/buttons/SubmitButton";
import Input from "src/components/form/Input";
import { TAuthForms } from "src/types/auth";
import { TFetchingStates } from "src/types/states";

type Props = {
  auth_data: TAuthForms;
  submitFunction: SubmitHandler<FieldValues>;
  state: TFetchingStates<unknown>;
};

const AuthForm = ({ auth_data, submitFunction, state }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-1 h-full justify-center items-center">
      <div className="w-96">
        <h1 className="text-3xl mb-7">{auth_data.title}</h1>

        <form className="grid gap-5 grid-cols-1" onSubmit={handleSubmit(submitFunction)}>
          {auth_data.inputs.map((form) => (
            <Input key={form.name} register={register} errors={errors} input={{ ...form }} />
          ))}

          <SubmitButton
            title={auth_data.button}
            loading={state.loading}
            className="w-32"
          />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
