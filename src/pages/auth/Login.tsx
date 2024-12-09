import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logIn } from "src/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleLogin = async (values: FieldValues) => {
    try {
      const currentUser = await logIn(values.email, values.password);
      toast.success(`User Login Successfully`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      navigate(`/${currentUser.uid}`);
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="panel">
      <div className="mx-auto w-1/3">
        <h1 className="text-3xl mb-7">Login</h1>
        <form
          className="grid gap-5 grid-cols-1 "
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col">
            <label className="mb-2">Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="placeholder:text-sm h-10"
              placeholder="type email ..."
            />
            <div className="text-red-500 text-sm mt-2">
              {errors["email"]?.message}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value: /^[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must be at least 6 characters and include only letters, numbers, or special characters.",
                },
              })}
              className="placeholder:text-sm h-10"
              placeholder="type password ..."
              type="password"
            />
            <div className="text-red-500 text-sm mt-2">
              {errors["password"]?.message}
            </div>
          </div>
          <button className="btn btn-primary mt-3 text-white" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
