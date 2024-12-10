import { TInput } from "./global";

export type TAuthForms = {
  title: string;
  inputs: TInput[];
  button: string;
  toast_message: string;
};

export type TAuthData = {
  login: TAuthForms;
  register: TAuthForms;
};
