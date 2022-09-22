import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate, sessionStorage.getItem("accessToken")]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts/getAllPosts").then((res) => {
      if (res.data) {
        setPostList(res.data);
      }
    });
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col">
        <button className="self-center w-1/6 mt-4 rounded-md p-3 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          <Link to="/createPost">Create Post</Link>
        </button>
        <button
          className="self-center w-1/6 mt-4 rounded-md p-3 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          onClick={() => {
            sessionStorage.removeItem("accessToken");
            navigate("/");
          }}
        >
          LogOut
        </button>
      </div>
      <div className="flex flex-wrap">
        {postList.map((value: any, index: number) => {
          return (
            <div
              key={index}
              className="px-2"
              onClick={() => {
                navigate(`/postData/${value.id}`);
              }}
            >
              <div className="bg-blue-400 p-2 flex flex-col">
                <span>{value.title}</span>
                <span>{value.postText}</span>
                <span>{value.username}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LandingPage;
