import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "../App.css";

const Sidebar = () => {
  return (
    <aside className="px-2 pl-5 py-1 pt-6  shadow-xs shadow-gray-500 h-screen w-56">
      {/* // Logo */}
      <div>
        <h1 className="text-[#bd8d14] font-bold text-4xl">Momenta</h1>
        <span className="text-md">Share your moments</span>
      </div>
{/* Links */}
      <section className="links mt-8">
        <div className="flex items-center mb-4 gap-3 hover:bg-gray-100 transition-all cursor-pointer rounded-md pl-2 py-2">
          <IoIosSearch className="size-7" />
          <p className="text-md">Search</p>
        </div>
        <div className="flex items-center mb-4 gap-3 hover:bg-gray-100 transition-all cursor-pointer rounded-md pl-2 py-2">
          <IoMdHome className="size-7" />
          <p className="text-md">Home</p>
        </div>
        <div className="flex items-center mb-4 gap-3 hover:bg-gray-100 transition-all cursor-pointer rounded-md pl-2 py-2">
          <CgProfile className="size-7" />
          <p className="text-md">Profile</p>
        </div>
      </section>
      
      {/* Settings */}
      <section>
        
      </section>
    </aside>
  );
};

export default Sidebar;
