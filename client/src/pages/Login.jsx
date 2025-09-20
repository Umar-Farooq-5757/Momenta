import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Login = () => {
  const { isDark } = useAppContext();
  const { login } = useAuth();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (!res.ok) {
      setError(res.message || "Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={submitHandler}
        className={`flex flex-col gap-4  m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 ${
          isDark ? "bg-[#0f0f0f]" : "bg-white"
        }`}
      >
        <Toaster/>
        {/* {error && <div className="text-red-500 mb-2">{error}</div>} */}
        <p className="text-2xl font-medium m-auto">
          <span className="text-[#c7961c]">User</span>{" "}
          Login
        </p>
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
            type="password"
            required
          />
        </div>
          <p>
            Create an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#c7961c] cursor-pointer"
            >
              click here
            </span>
          </p>
        <button className="bg-[#c7961c]  transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
