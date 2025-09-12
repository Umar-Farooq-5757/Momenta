import React from "react";
import profilePic from "../assets/profile.png";
import { useAppContext } from "../context/AppContext";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Post = ({ caption, image, likes, comments, createdAt }) => {
  const { isDark } = useAppContext();
  return (
    <section className="w-full max-w-[45rem] mx-auto p-3">
      {/* Profile / Follow button */}
      <div className="flex justify-between items-center px-1 md:px-2">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src={profilePic}
            alt="profile"
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ${
              isDark ? "invert" : ""
            }`}
          />
          <p className="transition-all hover:font-semibold cursor-pointer">
            Username here
          </p>
        </div>

        <button
          className={`rounded-md shadow-md font-semibold px-3 py-1 text-sm cursor-pointer hover:shadow-lg transition-all ${
            isDark ? "bg-[#ffff00] text-black" : "bg-[#c7961c] text-black"
          }`}
        >
          Follow
        </button>
      </div>

      {/* Actual Image */}
      <div
        className={`image mt-4 mb-2 rounded-md overflow-hidden border ${
          isDark ? "border-[#1a1a1a]" : "border-gray-100"
        }`}
      >
        {/* <img
          src={image}
          alt="post"
          className="w-full h-auto max-h-[30rem] object-cover"
        /> */}
        <picture>
          <source srcSet={image} type="image/avif" />
          <img
            src={image}
            alt="post"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Meta */}
      <p
        className={`${
          isDark ? "text-[#737373]" : "text-[#737373]"
        } text-xs md:text-sm`}
      >
        {moment(createdAt).fromNow()}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex flex-col items-center gap-0">
          <button
            className={`rounded-full ${
              isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"
            } p-2 transition-all`}
          >
            <AiOutlineLike className="text-xl md:text-2xl cursor-pointer" />
          </button>
          <span className="text-xs text-[#737373]">{likes} likes</span>
        </div>

        <div className="flex flex-col items-center gap-0">
          <button
            className={`rounded-full ${
              isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"
            } p-2 transition-all`}
          >
            <FaRegCommentAlt className="text-xl md:text-2xl cursor-pointer" />
          </button>
          <span className="text-xs text-[#737373]">{comments} comments</span>
        </div>
      </div>

      {/* Caption */}
      <p className="break-words">{caption}</p>
      <hr className="my-5" />
    </section>
  );
};

export default Post;
