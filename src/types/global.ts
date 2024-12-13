export type TInput = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: {
    value: boolean;
    message: string;
  };
  pattern: {
    value: RegExp;
    message: string;
  };
};

export type TIcon = {
  size: number;
  color?: string;
};