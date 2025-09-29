// Home.jsx
import Post from "../components/Post";
import { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { apiGet } from "../api";
import toast, { Toaster } from "react-hot-toast";
import CommentsModal from "../modals/CommentsModal";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { setIsSidebarOpen } = useAppContext();
  const { posts, setPosts } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false); 
  const [comments, setComments] = useState([]);
  const [postIdForComment, setPostIdForComment] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await apiGet("/post");
        if (mounted) setPosts(data.posts || []);
      } catch (err) {
        console.error("fetch posts", err);
        toast.error("Failed to load posts");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [setPosts]);

  // shuffle without mutating original posts
  function shuffleCopy(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Memoize shuffled posts so they don't reshuffle every render
  const shuffledPosts = useMemo(() => shuffleCopy(posts || []), [posts]);

  // centralized handler to open comments modal
  const openComments = (postComments = [], postId = "") => {
    setComments(Array.isArray(postComments) ? postComments : []);
    setPostIdForComment(postId);
    setIsCommentsModalOpen(true);
  };

  if (loading) return <div className="mt-20">Loading posts…</div>;
  if (!posts || posts.length === 0) return <div className="mt-20">No posts yet</div>;

  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <CommentsModal
        postIdForComment={postIdForComment}
        comments={comments}
        setComments={setComments} 
        isCommentsModalOpen={isCommentsModalOpen}
        setIsCommentsModalOpen={setIsCommentsModalOpen}
      />
      <h1 className="text-3xl font-bold mb-5 ml-4 md:ml-0">All Posts</h1>

      <div className="posts flex flex-col items-center gap-6">
        {shuffledPosts.map((post) => (
          <Post
            key={post._id}
            openComments={openComments} 
            postId={post._id}
            profilePic={post.author?.profilePic}
            author={post.author}
            caption={post.caption}
            image={post.image}
            likes={post.likes || []}
            dislikes={post.dislikes || []}
            comments={post.comments || []}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
