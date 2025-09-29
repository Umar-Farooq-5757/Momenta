// Post.jsx
import { useAppContext } from "../context/AppContext";
import moment from "moment";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Post = ({
  postId,
  caption,
  image,
  likes = [],
  dislikes = [],
  comments = [],
  createdAt,
  author = {},
  profilePic,
  openComments, // new prop
}) => {
  const { user, token } = useAuth(); // single call
  const { isDark } = useAppContext();

  console.log("Post comments prop:", comments);

  const followUser = async () => {
    if (!user) { toast.error("Login first"); return; }
    if (author._id === user._id) {
      toast.error("You cannot follow yourself");
      return;
    }
    if (!user.following.includes(author._id)) {
      try {
        const res = await fetch(`/api/user/follow/${author._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ currentUserId: user._id }),
        });
        if (!res.ok) throw new Error(await res.text());
        toast.success("Following this user");
        return res.json();
      } catch (err) {
        console.error(err);
        toast.error("Failed to follow");
      }
    } else {
      toast.error("Already following this user");
    }
  };

  const unFollowUser = async () => {
    if (!user) { toast.error("Login first"); return; }
    if (author._id === user._id) {
      toast.error("You cannot unfollow yourself");
      return;
    }
    if (user.following.includes(author._id)) {
      try {
        const res = await fetch(`/api/user/unfollow/${author._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ currentUserId: user._id }),
        });
        if (!res.ok) {
          const errorText = await res.text();
          toast.error(`Failed: ${errorText}`);
          return;
        }
        toast.success("Successfully unfollowed");
        return res.json();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    } else {
      toast.error("Already not following this user");
    }
  };

  const likePost = async () => {
    if (!user) { toast.error("Login first"); return; }
    const res = await fetch(`/api/post/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ currentUserId: user._id }),
    });
    if (!res.ok) {
      toast.error("Failed to like");
      throw new Error(await res.text());
    }
    toast.success("Liked this post");
    return res.json();
  };

  const dislikePost = async () => {
    if (!user) { toast.error("Login first"); return; }
    const res = await fetch(`/api/post/dislike/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ currentUserId: user._id }),
    });
    if (!res.ok) {
      toast.error("Failed to dislike");
      throw new Error(await res.text());
    }
    toast.error("Disliked this post");
    return res.json();
  };

  return (
    <section className="w-full max-w-[45rem] mx-auto p-2 sm:p-3">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center px-0 sm:px-1 md:px-2">
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src={profilePic}
            alt="profile"
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover`}
          />
          <p className="transition-all hover:font-semibold cursor-pointer">
            {author.username}
          </p>
        </div>
        <button
          onClick={() => {
            user?.following?.includes(author._id) ? unFollowUser() : followUser();
          }}
          type="button"
          className={`sm:text-[13px] cursor-pointer flex items-center gap-2.5 border border-gray-500/30 px-2 py-1 sm:px-4 sm:py-2 text-sm text-gray-800 rounded  hover:text-[#c7961c]  ${
            isDark ? "hover:border-[#c7961c] bg-black text-white hover:bg-[#fff5dc]" : "hover:border-[#c7961c] bg-white hover:bg-[#fff5dc]"
          } active:scale-95 transition`}
        >
          <SlUserFollow className="size-3 sm:size-4" />
          {user?.following?.includes(author._id) ? "Following" : "Follow"}
        </button>
      </div>

      <div className={`image mt-4 mb-2 rounded-md overflow-hidden border ${isDark ? "border-[#1a1a1a]" : "border-gray-100"}`}>
        <picture>
          <source srcSet={image} type="image/avif" />
          <img src={image} alt="post" loading="lazy" />
        </picture>
      </div>

      <p className={`${isDark ? "text-[#737373]" : "text-[#737373]"} text-xs md:text-sm`}>
        {moment(createdAt).fromNow()}
      </p>

      <div className="flex items-center gap-4 py-2">
        <div className="flex flex-col items-center gap-0">
          <button onClick={likePost} className={`rounded-full ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} p-2 transition-all`}>
            <AiOutlineLike className="text-xl md:text-2xl cursor-pointer" />
          </button>
          <span className="text-xs text-[#737373]">{likes.length > 0 ? likes.length : 0} likes</span>
        </div>

        <div className="flex flex-col items-center gap-0">
          <button onClick={dislikePost} className={`rounded-full ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} p-2 transition-all`}>
            <AiOutlineDislike className="text-xl md:text-2xl cursor-pointer" />
          </button>
          <span className="text-xs text-[#737373]">{dislikes.length > 0 ? dislikes.length : 0} dislikes</span>
        </div>

        <div className="flex flex-col items-center gap-0">
          <button
            onClick={() => openComments(comments, postId)} // <-- simplified
            className={`rounded-full ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} p-2 transition-all`}
          >
            <FaRegCommentAlt className="text-xl md:text-2xl cursor-pointer" />
          </button>
          <span className="text-xs text-[#737373]">{comments.length > 0 ? comments.length : 0} comments</span>
        </div>
      </div>

      <p className="break-words">{caption}</p>
      <hr className="my-5" />
    </section>
  );
};

export default Post;
