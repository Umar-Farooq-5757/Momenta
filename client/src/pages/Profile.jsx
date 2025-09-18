import profilePic from "../assets/profile.avif";
import { useAppContext } from "../context/AppContext";
import assets from "../assets/assets.js";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useReducer, useState } from "react";
import { apiGet } from "../api.js";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { isDark, setIsSidebarOpen } = useAppContext();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    async function getUserPosts() {
      const data = await apiGet(`/post/${user._id}`);
      setPosts(data.posts);
    }
    getUserPosts();
  }, [user]);

  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      {/* Profile picture, username, followers e.t.c. */}
      <section className=" px-3 sm:px-12 md:px-0 xl:px-20">
        <div className="flex items-center gap-4 sm:gap-12">
          <img
            className={`size-24 sm:size-28 md:size-36 rounded-full ${
              isDark ? "invert" : ""
            }`}
            src={user?.profilePic}
            alt=""
          />
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold mb-0 sm:mb-2">
              {user?.username}
            </h1>
            <p>
              <span
                className={`font-semibold ${
                  isDark ? "text-[#ffff00]" : "text-[#c7961c]"
                } text-md mr-1`}
              >
                {user?.followers?.length}
              </span>{" "}
              followers
            </p>
            <p>
              <span
                className={`font-semibold ${
                  isDark ? "text-[#ffff00]" : "text-[#c7961c]"
                } text-md mr-1`}
              >
                {user?.following?.length}
              </span>{" "}
              following
            </p>
            <p>
              <span
                className={`font-semibold ${
                  isDark ? "text-[#ffff00]" : "text-[#c7961c]"
                } text-md mr-1`}
              >
                129
              </span>{" "}
              posts
            </p>
          </div>
        </div>
        <p className="my-2 sm:my-3 text-sm">{user?.bio?.description}</p>
        <p className="my-2 sm:my-3 text-sm flex items-center gap-1">
          <IoLocationSharp className="size-5" />
          <span>{user?.bio?.location}</span>
        </p>
      </section>
      {/* Posts */}
      <section className="px-3 sm:px-12 md:px-0 xl:px-20">
        <h2 className="font-semibold text-lg sm:text-2xl mb-4">Posts:</h2>
        <div className="grid justify-center grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-3">
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className="size-20 sm:size-32 md:size-36 lg:size-40 my-1 transition-all hover:scale-105 post rounded-md overflow-hidden max-w-38 flex justify-center items-center"
              >
                <picture className="size-24 sm:size-32 md:size-36 lg:size-40 my-1 transition-all hover:scale-105 post rounded-md overflow-hidden max-w-38 flex justify-center items-center">
                  <source srcSet={post.image} type="image/avif" />
                  <img
                    className="w-full h-full rounded-md object-cover object-center"
                    src={post.image}
                    alt="post"
                    loading="lazy"
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
