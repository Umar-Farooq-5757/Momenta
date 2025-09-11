import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import "../App.css";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isDark, setIsDark, isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen w-60 px-4 py-6
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-60
        ${isDark ? "bg-black text-white" : "bg-white text-black"}
        shadow-xs shadow-gray-400
      `}
    >
      <button
        onClick={() => setIsSidebarOpen(false)}
        className={`absolute top-2 right-2 rounded-full p-1 md:hidden block ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-100"}`}
      >
        <IoMdClose className="size-7" />
      </button>

      {/* Logo */}
      <div>
        <h1 className={`${isDark ? "text-[#ffff00]" : "text-[#c7961c]"} font-bold text-4xl`}>Momenta</h1>
        <span className="text-sm">Share your moments</span>
      </div>

      {/* Links */}
      <section className="links mt-8">
        <NavLink to={'/search'} className={({ isActive }) =>`active:scale-90 w-full flex items-center mb-4 gap-3 ${isActive ? `${isDark?'bg-[#1a1a1a]':'bg-[#eeeff0]'} ` : ''}  ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-100"} transition-all cursor-pointer rounded-md pl-2 py-2`}>
          <IoIosSearch className="size-7" />
          <p className="text-md">Search</p>
        </NavLink>
               <NavLink to={'/'} className={({ isActive }) =>`active:scale-90 w-full flex items-center mb-4 gap-3 ${isActive ? `${isDark?'bg-[#1a1a1a]':'bg-[#eeeff0]'} ` : ''}  ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-100"} transition-all cursor-pointer rounded-md pl-2 py-2`}>

          <IoMdHome className="size-7" />
          <p className="text-md">Home</p>
        </NavLink>
               <NavLink to={'/profile'} className={({ isActive }) =>`active:scale-90 w-full flex items-center mb-4 gap-3 ${isActive ? `${isDark?'bg-[#1a1a1a]':'bg-[#eeeff0]'} ` : ''}  ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-100"} transition-all cursor-pointer rounded-md pl-2 py-2`}>
          <FaRegCircleUser className="size-7" />
          <p className="text-md">Profile</p>
        </NavLink>
      </section>

      {/* Settings */}
      <section className="absolute bottom-0 left-0 right-0 w-full py-1 my-3">
        <div className={`flex items-center justify-between px-3 py-3 border-t ${isDark ? "border-gray-800" : "border-gray-300"}`}>
          <p>Toggle Theme</p>
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => { setIsDark(!isDark); localStorage.setItem('isDark', !isDark); }}
            className={`toggle border-[#8d690f] text-[#8d690f] bg-transparent checked:border-[#8d690f] checked:bg-[#c7961c] checked:text-[#8d690f]`}
          />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
