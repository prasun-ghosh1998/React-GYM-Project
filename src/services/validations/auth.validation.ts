import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup.string().required("Name is required"),
  lastname: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().required("Name is required"),
  age: yup.string().required("Name is required"),
  phone: yup.string().required("phone is required"),
  weight: yup.string().required("Weight is required"),
  goal: yup.string().required("Goal is required"),
  password: yup.string().required("Password is required"),
  role: yup
    .mixed<"user" | "admin">()
    .oneOf(["user", "admin"])
    .defined()
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
