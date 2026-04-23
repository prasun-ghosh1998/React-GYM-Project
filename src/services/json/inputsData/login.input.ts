import type { DynamicInputProps } from "../../../typeScript/interface/form.interface";
import type { LoginData } from "../../../typeScript/type/auth.type";

export const LoginInputField: Array<
  Omit<DynamicInputProps<LoginData>, "register" | "errors">
> = [
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];