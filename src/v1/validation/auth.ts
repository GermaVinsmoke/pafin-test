import { object, string } from "yup";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

const signupSchema = object({
  body: object({
    name: string().required("Name is required").min(8).max(32),
    email: string().email("Must be a valid email").required(),
    password: string()
      .matches(passwordRegex, "Invalid password")
      .required("Password is required")
      .min(6)
      .max(32),
    confirmPassword: string()
      .matches(passwordRegex, "Invalid password")
      .required("Confirm password is required")
      .min(6)
      .max(32),
  }),
});

const loginSchema = object({
  body: object({
    email: string().email("Must be a valid email").required(),
    password: string()
      .matches(passwordRegex, "Invalid password")
      .required("Password is required"),
  }),
});

export { signupSchema, loginSchema };
