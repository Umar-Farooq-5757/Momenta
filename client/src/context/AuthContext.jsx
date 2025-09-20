import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import * as authService from "../auth.js";
import { jwtDecode } from "jwt-decode";

// fetch("/api/auth/me", {
//   headers: { Authorization: `Bearer ${token}` }
// }).then(res => res.json())
//   .then(data => {
//     const currentUserId = data._id;
//   });

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);
  const decoded = token ? jwtDecode(token) : null;
  const currentUserId = decoded ? decoded.id : null;
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: u, token: t } = await authService.login(email, password);
      setUser(u);
      setToken(t);
      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { user: u, token: t } = await authService.register(payload);
      setUser(u);
      setToken(t);
      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, message: err.message || "Register failed" };
    } finally {
      setLoading(false);
    }
  };
  // logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        currentUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
