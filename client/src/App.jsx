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
      <LuMenu
        onClick={() => setIsSidebarOpen(true)}
        className={`size-8 fixed top-3 left-3 cursor-pointer md:hidden ${
          isSidebarOpen ? "hidden" : "block"
        }`}
      />

      <Sidebar />

      <div className="grow">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
