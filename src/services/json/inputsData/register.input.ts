import type { DynamicInputProps } from "../../../typeScript/interface/form.interface";
import type { RegisterData } from "../../../typeScript/type/auth.type";

export const RegisterInputField: Array<
  Omit<DynamicInputProps<RegisterData>, "register" | "errors">
> = [
  {
    name: "firstname",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "text",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "weight",
    label: "Weight (kg)",
    type: "text",
    required: false,
  },
  {
    name: "goal",
    label: "Fitness Goal",
    type: "text",
    required: false,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];