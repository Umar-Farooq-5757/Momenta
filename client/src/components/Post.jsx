import React from "react";
import profilePic from "../assets/profile.png";
import { useAppContext } from "../context/AppContext";
import assets from "../assets/assets.js";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Post = () => {
  const { isDark } = useAppContext();
  return (
    <section className=" max-w-[48rem] p-2 ">
      {/* Profile pic/ follow button */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <img
            className={`size-7 ${isDark ? "invert" : ""}`}
            src={profilePic}
            alt=""
          />
          <p className="transition-all hover:font-semibold cursor-pointer">
            Username here
          </p>
        </div>
        <button
          className={`rounded-md shadow-md font-semibold px-2 py-1 cursor-pointer hover:shadow-lg transition-all ${
            isDark ? "bg-[#ffff00] text-black" : "bg-[#c7961c]"
          }`}
        >
          Follow
        </button>
      </div>
      {/* Actual image */}
      <div
        className={`image hover:outline ${
          isDark ? "hover:outline-[#ffff00]" : "hover:outline-[#c7961c]"
        } rounded-md overflow-hidden mt-4 mb-0 border-3 ${
          isDark ? "border-[#1a1a1a]" : "border-gray-100"
        }`}
      >
        <img className="" src={assets.cloudcomputing} alt="" />
      </div>
      {/* Upload time */}
      <p className={`${isDark ? "text-[#737373]" : "text-[#737373]"} text-sm`}>
        {moment(Date.now()).fromNow()}
      </p>
      {/* Actions */}
      <div className="flex items-center gap-3 py-0">
        <div className={` flex flex-col items-center gap-1  `}>
          <button
            className={`rounded-full ${
              isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"
            } p-2 transition-all`}
          >
            <AiOutlineLike className="size-7 cursor-pointer" />
          </button>
          <span
            className={`${
              isDark ? "text-[#737373]" : "text-[#737373]"
            } text-xs`}
          >
            824 likes
          </span>
        </div>
       <div className={` flex flex-col items-center gap-1  `}>
          <button
            className={`rounded-full  ${
              isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"
            } p-2 transition-all`}
          >
            <FaRegCommentAlt className="size-7 p-[2px] cursor-pointer" />
          </button>
          <span
            className={`${
              isDark ? "text-[#737373]" : "text-[#737373]"
            } text-xs`}
          >
            23 comments
          </span>
        </div>
      </div>
    </section>
  );
};

export default Post;
