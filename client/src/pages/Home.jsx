import Post from "../components/Post";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
// import { dummyPosts } from "../assets/assets";
import { apiGet } from "../api";

const Home = () => {
  const { setIsSidebarOpen } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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



  if (loading) return <div className="mt-20">Loading posts…</div>;
  if (!posts.length) return <div className="mt-20">No posts yet</div>;
  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-bold mb-5 ml-4 md:ml-0">All Posts</h1>

      {/* center posts and add vertical gap */}
      <div className="posts flex flex-col items-center gap-6">
        {posts.map((post, i) => (
          <Post
            key={i}
            author={post.author}
            caption={post.caption}
            image={post.image}
            likes={post.likes}
            comments={post.comments.length}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
