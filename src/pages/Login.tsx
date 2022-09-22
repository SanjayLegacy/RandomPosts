import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "../utils/validations";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginFormValidation) });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    const data = { username: values.username, password: values.password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((res: any) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log("User Logged IN", res.data);
          sessionStorage.setItem("accessToken", res.data.jwtToken);
          navigate("/landingPage");
        }
      })
      .catch((error) => {
        if (error) {
          console.log("Error => ", error);
        }
      });
  });

  return (
    <div
      className="h-screen flex flex-col items-center justify-center md:bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
      }}
    >
      <div className="w-11/12 md:w-7/12 lg:w-[30%] h-fit p-4 md:p-16 bg-white flex flex-col shadow-md rounded-md relative">
        <p className="text-2xl mb-3">Login</p>
        <form onSubmit={onSubmit}>
          <input
            {...register("username")}
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
            placeholder="Username"
          />
          {errors?.username && (
            <span className="text-red-500">{errors?.username.message}</span>
          )}
          <input
            {...register("password")}
            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
            placeholder="Password"
          />
          {errors?.password && (
            <span className="text-red-500">{errors?.password.message}</span>
          )}
          <button
            type="submit"
            className="w-1/2 mt-4 rounded-md p-3 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          >
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
