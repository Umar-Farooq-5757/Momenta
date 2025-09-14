export async function uploadPost(file, caption) {
  const token = localStorage.getItem("token"); // or use context
  const fd = new FormData();
  fd.append("image", file);
  fd.append("caption", caption || "");

  const res = await fetch(`${API}/post/create`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: fd,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Upload failed" }));
    throw new Error(err.message || "Upload failed");
  }
  return res.json();
}
