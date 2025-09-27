import Post from "../components/Post";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
// import { dummyPosts } from "../assets/assets";
import { apiGet } from "../api";
import toast, { Toaster } from "react-hot-toast";
import CommentsModal from "../modals/CommentsModal";

const Home = () => {
  const { setIsSidebarOpen } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(true)

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await apiGet("/post");
        if (mounted) setPosts(data.posts);
      } catch (err) {
        console.error("fetch posts", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (loading) return <div className="mt-20">Loading posts…</div>;
  if (!posts.length) return <div className="mt-20">No posts yet</div>;
  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #c7961c",
            color: "#c7961c",
          },
        }}
      />
      <CommentsModal isCommentsModalOpen={isCommentsModalOpen} setIsCommentsModalOpen={setIsCommentsModalOpen}/>
      <h1 className="text-3xl font-bold mb-5 ml-4 md:ml-0">All Posts</h1>
      {/* center posts and add vertical gap */}
      <div className="posts flex flex-col items-center gap-6">
        {shuffle(posts).map((post, i) => (
          <Post
            key={i}
            postId={post._id}
            profilePic={post.author.profilePic}
            author={post.author}
            caption={post.caption}
            image={post.image}
            likes={post.likes}
            dislikes={post.dislikes}
            comments={post.comments.length}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;