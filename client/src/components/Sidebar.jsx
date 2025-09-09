import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "../App.css";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const {isDark, setIsDark} = useAppContext()
  return (
    <aside className="px-2 pl-5 py-1 pt-6 relative shadow-xs shadow-gray-400 h-screen w-60">
      {/* // Logo */}
      <div>
        <h1 className="text-[#c7961c] font-bold text-4xl">Momenta</h1>
        <span className="text-md">Share your moments</span>
      </div>
      {/* Links */}
      <section className="links mt-8">
        <div className={`flex items-center mb-4 gap-3 ${isDark?'hover:bg-[#1a1a1a]':'hover:bg-gray-100'} transition-all cursor-pointer rounded-md pl-2 py-2`}>
          <IoIosSearch className="size-7" />
          <p className="text-md">Search</p>
        </div>
        <div className={`flex items-center mb-4 gap-3 ${isDark?'hover:bg-[#1a1a1a]':'hover:bg-gray-100'} transition-all cursor-pointer rounded-md pl-2 py-2`}>
          <IoMdHome className="size-7" />
          <p className="text-md">Home</p>
        </div>
        <div className={`flex items-center mb-4 gap-3 ${isDark?'hover:bg-[#1a1a1a]':'hover:bg-gray-100'} transition-all cursor-pointer rounded-md pl-2 py-2`}>
          <CgProfile className="size-7" />
          <p className="text-md">Profile</p>
        </div>
      </section>

      {/* Settings */}
      <section className="absolute bottom-0 left-0 right-0 w-full py-1 my-3">
        <div className={`flex items-center justify-between px-3 py-3 border ${isDark?'border-gray-800':'border-gray-300'}`}>
          <p>Toggle Theme</p>
          <input
            type="checkbox"
            checked={isDark}
            onChange={()=>setIsDark(!isDark)}
            className="toggle border-[#8d690f] text-[#8d690f] bg-transparent checked:border-[#8d690f] checked:bg-[#c7961c] checked:text-[#8d690f]"
          />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
