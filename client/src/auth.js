const API = import.meta.env.VITE_API_URL || "/api";

export async function login(email, password) {
  const res = await fetch(`${API}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  // If backend returns token in response
  const { token, user } = data;
  localStorage.setItem("token", token);
  return user;
}
