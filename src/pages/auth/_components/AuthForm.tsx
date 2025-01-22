import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "src/components/Buttons/SubmitButton";
import Input from "src/components/Form/Input";
import { TFetchingInitialState } from "src/hooks/reducers";
import { TAuthForms } from "src/types/auth";

type Props = {
  auth_data: TAuthForms;
  submitFunction: SubmitHandler<FieldValues>;
  state: TFetchingInitialState<unknown>;
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
            className="border-gray-300 block me-auto w-32 justify-between"
            loading={state.loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
