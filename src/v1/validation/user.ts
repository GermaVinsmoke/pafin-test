import { object, string } from "yup";

const userIdSchema = object({
  params: object({
    id: string().required("Id is required"),
  }),
});

const updateUserSchema = object({
  body: object({
    name: string().required("Name is required").min(8).max(32),
    email: string().email("Must be a valid email").required(),
  }),
  params: object({
    id: string().required("Id is required"),
  }),
});

export { userIdSchema, updateUserSchema };
