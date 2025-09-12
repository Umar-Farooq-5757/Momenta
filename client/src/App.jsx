import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import Sidebar from "./components/Sidebar";
import { useAppContext } from "./context/AppContext";
import "./App.css";

function App() {
  const { isDark, isSidebarOpen, setIsSidebarOpen, user } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.backgroundColor = isDark
      ? "black"
      : "white";
  }, [isDark]);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  const showSidebar = user && location.pathname !== "/login";

  return (
    <main
      className={`${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } transition-all flex min-h-screen`}
    >
      {showSidebar ? (
        <>
          {/* Mobile menu toggle */}
          <div
            className={`fixed px-3 pt-3 pb-1 top-0 right-0 left-0 md:hidden cursor-pointer shadow-md w-full border-b ${
              isDark ? "bg-black border-gray-700" : "bg-white border-gray-200"
            } z-50 ${isSidebarOpen ? "hidden" : "block"}`}
          >
            <LuMenu
              onClick={() => setIsSidebarOpen(true)}
              className="size-8"
              aria-label="Open sidebar menu"
            />
          </div>
          <Sidebar />
          <div className="grow md:ml-60">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="w-full">
          <Outlet />
        </div>
      )}
    </main>
  );
}

export default App;
