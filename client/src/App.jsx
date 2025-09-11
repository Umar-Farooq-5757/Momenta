import { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { useAppContext } from "./context/AppContext";
import { LuMenu } from "react-icons/lu";
import { Outlet } from "react-router-dom";

function App() {
  const { isDark, setIsSidebarOpen, isSidebarOpen } = useAppContext();

  useEffect(() => {
    document.querySelector("html").style.backgroundColor = isDark
      ? "black"
      : "white";
  }, [isDark]);

  return (
    <main
      className={`${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } transition-all flex min-h-screen`}
    >
      <div
        className={`fixed px-3 pt-3 pb-1 top-0 right-0 left-0 md:hidden cursor-pointer shadow-md w-full border-b  ${
          isDark ? "bg-black border-gray-700" : "bg-white border-gray-200"
        } z-50 ${isSidebarOpen ? "hidden" : "block"}`}
      >
        <LuMenu onClick={() => setIsSidebarOpen(true)} className="size-8" />
      </div>

      <Sidebar />

      <div className="grow md:ml-60">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
