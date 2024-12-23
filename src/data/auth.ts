import { TAuthData } from "src/types/auth";

export const auth_data: TAuthData = {
  login: {
    title: "Login",
    inputs: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        required: {
          value: true,
          message: "Password is required",
        },
        pattern: {
          value: /^[A-Za-z\d@$!%*?&]{6,}$/,
          message:
            "Password must be at least 6 characters and include only letters, numbers, or special characters.",
        },
      },
    ],
    button: "Login",
    toast_message: "User login successfully",
  },

  register: {
    title: "Register",
    inputs: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        required: {
          value: true,
          message: "Password is required",
        },
        pattern: {
          value: /^[A-Za-z\d@$!%*?&]{6,}$/,
          message:
            "Password must be at least 6 characters and include only letters, numbers, or special characters.",
        },
      },
    ],
    button: "Register",
    toast_message: " User registered successfully",
  },
};
