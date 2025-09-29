// CommentsModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Architecture from "../assets/architecture.avif";
import { useAppContext } from "../context/AppContext";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext";

const CommentsModal = ({
  isCommentsModalOpen,
  setIsCommentsModalOpen,
  comments = [],
  setComments, // new prop
  postIdForComment,
}) => {
  const { isDark } = useAppContext();
  const { token } = useAuth();
  const [commentText, setCommentText] = useState("");
  console.log("Modal comments prop:", comments);

  const addComment = async () => {
    if (!commentText.trim()) {
      toast.error("Type a comment first");
      return;
    }
    try {
      const res = await apiPost(`/post/comment/${postIdForComment}`, { text: commentText.trim() }, token);
      const createdComment = res.comment || res; 
      setComments((prev) => [...prev, createdComment]);
      setCommentText("");
      toast.success("Comment added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    }
  };

  return createPortal(
    <div
      onClick={() => setIsCommentsModalOpen(false)}
      className={`${isDark ? "bg-white/40" : "bg-black/60"} fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center ${isCommentsModalOpen ? "" : "hidden"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isDark ? "bg-black text-white" : "bg-[#e7e7e7] text-black"} rounded-md relative overflow-hidden py-3 px-2 md:px-4 shadow-2xl h-4/5 w-full sm:w-5/6 md:w-2/3 lg:w-2/3 xl:w-1/2`}
      >
        <h1 className="font-bold text-2xl mb-4">Comments</h1>
        <div className="comments space-y-3 overflow-auto max-h-[65%] pb-20">
          {comments && comments.length > 0 ? (
            comments.map((comment, i) => {
              const key = comment._id || `${i}-${comment.text?.slice(0,10)}`;
              return (
                <div key={key} className={`comment ${isDark ? "bg-[#202020] shadow-[#303030]" : "bg-white"} py-2 pl-1 md:pl-3 shadow-md rounded-md flex items-start gap-2 md:gap-3`}>
                  <picture>
                    <source srcSet={Architecture} type="image/avif" />
                    <img className="rounded-full size-8 md:size-10 object-center" src={Architecture} alt="author" loading="lazy" />
                  </picture>
                  <div className="max-w-[87%]">
                    <h4 className="font-semibold text-sm">{comment.author?.username || "Author name"}</h4>
                    <p className="text-justify text-sm pr-2">{comment.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p>No comments yet,</p>
              <br />
              <p>Be the first to comment</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center absolute bottom-0 right-0 left-0 bg-white py-1 px-2 border-t border-gray-400">
          <input
            className="outline-none grow bg-transparent"
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type a comment..."
          />
          <button onClick={addComment} className={`${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} p-2 rounded-full`}>
            <IoSend className={`cursor-pointer`} />
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#portal")
  );
};

export default CommentsModal;
