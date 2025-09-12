import React from 'react'
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const {isDark} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

  return (
     <div className='min-h-screen flex flex-col items-center justify-center'>
        <form className={`flex flex-col gap-4  m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 ${isDark?'bg-[#0f0f0f]':'bg-white'}`}>
            <p className="text-2xl font-medium m-auto">
                <span className="text-[#c7961c]">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email}  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password}  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-[#c7961c] cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-[#c7961c] cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-[#c7961c]  transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
     </div>
  )
}

export default Login
