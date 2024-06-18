import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { host } from "../apiRoutes";

const Login = () => {
  const { setProgress, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setProgress(0);
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill all fields");
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email");
    }

    const res = await axios.post(`${host}/api/login`, {
      email,
      password,
    });
    const data = await res.data;
    setUser(data.data);
    localStorage.setItem("token", data.token);
    setProgress(100);
    if (data.success === true) {
      toast.success(data.message);
      e.target.reset();
      navigate("/profile");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-32">
      <h4 className="font-bold text-3xl text-white">Login</h4>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-5 mt-5">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex gap-8 justify-between items-center mt-5">
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-md"
          >
            Login
          </button>
          <Link to="/signup" className="text-primary text-sm">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
