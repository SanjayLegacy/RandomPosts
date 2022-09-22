import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function InitialPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      navigate("/landingPage");
    } else {
      navigate("/");
    }
  }, [navigate, sessionStorage.getItem("accessToken")]);

  return (
    <div
      className={`md:bg-center md:bg-cover bg-no-repeat h-screen flex flex-col`}
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
      }}
    >
      <div className={`h-full flex overflow-y-auto items-center`}>
        <div className="flex flex-col">
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Link to="/login">
              <div className="w-72 rounded-lg mt-4 mb-2">
                <span className="text-white text-6xl">Login</span>
              </div>
            </Link>
          </button>
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <Link to="/register">
              <div className="w-72 rounded-lg mt-4 mb-2">
                <span className="text-white text-6xl">Register</span>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
