import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentsValidation } from "../utils/validations";

type CommentForm = {
  comment: string;
};

function PostData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>({});
  const [commentData, setCommentData] = useState<any>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>({ resolver: yupResolver(commentsValidation) });

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/getPostsById/${id}`).then((res1) => {
      if (res1.data) {
        setPostData(res1.data);
        axios
          .get(`http://localhost:3001/comments/getCommentsById/${id}`)
          .then((res2) => {
            setCommentData(res2.data);
          });
      }
    });
  }, [id]);

  const onSubmit = handleSubmit((values) => {
    axios
      .post(
        "http://localhost:3001/comments/postComments",
        { PostId: id, comment: values.comment },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") ?? "" },
        }
      )
      .then(() => {
        console.log("Commented Successfully!");
      })
      .catch((error) => {
        if (error) {
          console.log("Error => ", error);
        }
      });
  });

  const deletePost = (id: number) => {
    axios
      .delete(`http://localhost:3001/posts/deletePost/${id}`)
      .then(() => {
        console.log("Deleted Successfully!");
        navigate("/landingPage");
      })
      .catch((error) => {
        if (error) {
          console.log("Error => ", error);
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col bg-blue-600 p-2">
        <span className="text-white">{postData?.title}</span>
        <span className="text-white">Post: {postData?.postText}</span>
        <span className="text-white">User: {postData?.username}</span>
      </div>
      <div>
        <span
          onClick={() => {
            deletePost(postData?.id);
          }}
        >
          Delete Post
        </span>
      </div>
      <div className="py-2" />
      {commentData.length > 0 && <span>COMMENTS</span>}
      {commentData.length > 0 ? (
        commentData.map((value: any, index: number) => {
          return (
            <div key={index}>
              <span>
                {index + 1} ={">"} {value.comment}
              </span>
            </div>
          );
        })
      ) : (
        <span>NO COMMENTS</span>
      )}
      <div className="py-2" />
      <div className="flex flex-row justify-center">
        <span>Add a comment ={">"} </span>
        <form onSubmit={onSubmit}>
          <textarea
            {...register("comment")}
            className="flex rounded-lg py-2 px-4 bg-gray-200"
          />
          {errors?.comment && (
            <span className="text-red-500">{errors?.comment.message}</span>
          )}
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white rounded-md"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostData;
