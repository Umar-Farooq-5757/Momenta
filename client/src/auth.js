import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

// Register
export async function register({
  username,
  email,
  password,
  profilePic,
  age,
  description,
  location,
}) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profilePic", profilePic);
  formData.append("age", age);
  formData.append("description", description);
  formData.append("location", location);

  const res = await fetch(`${API}/user/register`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Registration failed");
  const data = await res.json();
  const { token, user } = data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { user, token };
}

// Login
export async function login(email, password) {
  const res = await fetch(`${API}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    toast.error("Invalid credentials")
    throw new Error("Login failed");
  }
  const data = await res.json();
  const { token, user } = data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { user, token };
}