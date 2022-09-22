import * as yup from "yup";

export const createPostValidation = yup.object().shape({
  title: yup.string().required("You must enter a title!"),
  postText: yup.string().required("required"),
  username: yup.string().required("required"),
});

export const commentsValidation = yup.object().shape({
  comment: yup.string().required("required"),
});

export const loginFormValidation = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

export const registerFormValidation = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});
