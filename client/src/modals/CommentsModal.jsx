import React from "react";
import { createPortal } from "react-dom";
import Architecture from "../assets/architecture.avif";
import { useAppContext } from "../context/AppContext";

const CommentsModal = ({ isCommentsModalOpen, setIsCommentsModalOpen }) => {
  const { isDark } = useAppContext();
  return createPortal(
    <div
      onClick={() => setIsCommentsModalOpen(false)}
      className={`${isDark?'bg-white/40':'bg-black/60'} fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center ${
        isCommentsModalOpen ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          isDark ? "bg-black text-white" : "bg-[#e7e7e7] text-black"
        }  rounded-md py-3 px-4 shadow-2xl h-4/5 w-1/2`}
      >
        <h1 className="font-bold text-2xl mb-4">Comments</h1>
        <div className="comments">
          <div className={`comment ${isDark?'bg-[#202020] shadow-[#303030]':'bg-white'} py-2 pl-3 shadow-md rounded-md flex items-start gap-3`}>
            {/* Author profile pic */}
            <picture>
              <source srcSet={Architecture} type="image/avif" />
              <img
                className="rounded-full size-10 object-center"
                src={Architecture}
                alt="post"
                loading="lazy"
              />
            </picture>
            <div className="max-w-[87%]">
              {/* Comment author */}
              <h4 className="font-semibold text-sm">Author name</h4>
              {/* Actual comment text */}
              <p className="text-justify">
                This is some dummy text for comment. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Distinctio, dolorum perspiciatis
                repellat commodi aut illo obcaecati autem eius at, ratione
                reprehenderit odio error non facere necessitatibus, quasi
                accusantium esse laboriosam laborum sint. Est nostrum amet
                aliquam, doloremque corporis, aperiam perferendis libero in
                voluptates minima ducimus officiis ipsa obcaecati consequatur a.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#portal")
  );
};

export default CommentsModal;
