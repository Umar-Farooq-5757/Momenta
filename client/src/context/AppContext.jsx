import { createContext, useContext, useState } from "react";
import { dummyUsers } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(dummyUsers[0]);

  const value = {
    isDark,
    setIsDark,
    isSidebarOpen,
    setIsSidebarOpen,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
87