import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { uploadPost } from "../upload.js";
import { useNavigate } from "react-router-dom";
import { register } from "../auth.js";

export default function Register() {
  const { isDark } = useAppContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const dropRef = useRef(null);
  const navigate = useNavigate();

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (!profilePic) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(profilePic);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profilePic]);

  // handle a single File object
  const handleFile = (f) => {
    setError("");
    if (!f) return;
    // basic mime check + fallback
    if (!f.type || !f.type.startsWith("image/")) {
      // sometimes type can be empty; try extension fallback
      const name = (f.name || "").toLowerCase();
      if (!name.match(/\.(jpg|jpeg|png|webp|gif|heic)$/)) {
        setError("Only image files are allowed (jpg, png, webp, gif).");
        return;
      }
    }
    if (f.size > maxFileSize) {
      setError("Image is too large. Max size is 5MB.");
      return;
    }
    setProfilePic(f);

    if (inputRef.current) inputRef.current.value = "";
  };

  const onInputChange = (e) => {
    const f = e.target.files && e.target.files[0];
    handleFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2", "ring-offset-2");
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("ring-2", "ring-offset-2");
  };
  const onDrop = (e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("ring-2", "ring-offset-2");
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  };

  const removeImage = () => {
    setProfilePic(null);
    setPreview(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!profilePic) {
      setError("Please choose an image before posting.");
      return;
    }
    setIsSubmitting(true);
    try {
      // const formData = new FormData();
      // formData.append("profilePic", profilePic);
      // formData.append("username", username);
      // formData.append("email", email);
      // formData.append("password", password);
      // formData.append("age", age);
      // formData.append("description", description);
      // formData.append("location", location);
      const created = await register(
        profilePic,
        username,
        email,
        password,
        age,
        description,
        location
      );
      navigate("/");

      if (!res.ok) throw new Error("Upload failed");
      setUsername('')
      setEmail('')
      setPassword('')
      setAge(null)
      setDescription('')
      setLocation('')
      removeImage();
      alert("Post uploaded successfully");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while uploading.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-start py-20">
      <form
        onSubmit={handleSubmit}
        className={`${
          isDark ? "bg-[#0e0e0e] text-white" : "bg-white text-gray-700"
        } max-w-[600px] w-full mx-4 p-6 rounded-lg border ${
          isDark ? "border-gray-800/60" : "border-gray-300/60"
        } shadow-sm`}
        aria-labelledby="new-post-title"
      >
        <p className="text-2xl mb-2 text-center font-medium m-auto">
          <span className="text-[#c7961c]">User</span> Register
        </p>

        <div
          ref={dropRef}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center gap-3 transition ${
            isDark
              ? "border-gray-700 bg-[#0b0b0b]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <input
            ref={inputRef}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={onInputChange}
            className="sr-only"
          />

          {!preview ? (
            <>
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5 5 5M12 5v12"
                  />
                </svg>
                <p className="text-sm">Drag & drop an image here, or</p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium cursor-pointer border focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span className="underline">Choose image</span>
                </button>
                <p className="text-xs mt-1 text-gray-400">
                  PNG, JPG, WEBP — max 5MB
                </p>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/2">
                <div className="rounded overflow-hidden border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-56 object-contain bg-black/5"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-sm px-3 py-1 rounded border"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-sm px-3 py-1 rounded border"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <p className="text-xs text-gray-400">
                  Selected file: {profilePic?.name} (
                  {(profilePic?.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
              <div className="w-full ">
                <p>Username</p>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="text"
                  required
                />
              </div>
              <div className="w-full ">
                <p>Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="email"
                  required
                />
              </div>
              <div className="w-full ">
                <p>Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="password"
                  required
                />
              </div>
              <div className="w-full ">
                <p>Age</p>
                <input
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="number"
                  required
                />
              </div>
              <div className="w-full ">
                <p>Description</p>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="text"
                  required
                />
              </div>
              <div className="w-full ">
                <p>Location</p>
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#c7961c]"
                  type="text"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded font-medium ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "bg-[#c7961c] text-white"
            }`}
          >
            {isSubmitting ? "Proceeding..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
}
