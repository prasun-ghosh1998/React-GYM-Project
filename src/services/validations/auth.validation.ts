import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup.string().required("Name is required"),
  lastname: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().required("Name is required"),
  age: yup.string().required("Name is required"),
  phone: yup.string().required("phone is required"),
  weight: yup.string(),
  goal: yup.string(),
  password: yup.string().required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
