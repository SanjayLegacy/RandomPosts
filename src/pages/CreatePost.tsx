import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostValidation } from "../utils/validations";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type CreatePostForm = {
  title: string;
  postText: string;
  username: string;
};

function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({ resolver: yupResolver(createPostValidation) });

  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    axios
      .post("http://localhost:3001/posts/post", values)
      .then(() => {
        navigate("/landingPage");
      })
      .catch((error) => {
        if (error) {
          console.log("Error => ", error);
        }
      });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col flex-1 items-center">
          <div className="flex flex-row items-center">
            <label>Title : </label>
            <div>
              <input
                {...register("title")}
                className="border-2 rounded-md py-1"
              />
              {errors?.title && (
                <span className="text-red-500">{errors?.title.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <label>Post Text : </label>
            <div>
              <input
                {...register("postText")}
                className="border-2 rounded-md py-1"
              />
              {errors?.postText && (
                <span className="text-red-500">{errors?.postText.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <label>Username : </label>
            <div>
              <input
                {...register("username")}
                className="border-2 rounded-md py-1"
              />
              {errors?.username && (
                <span className="text-red-500">{errors?.username.message}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
