import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { dummyPosts } from "../assets/assets";

const Home = () => {
  const { setIsSidebarOpen } = useAppContext();
  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-bold mb-5 ml-4 md:ml-0">All Posts</h1>

      {/* center posts and add vertical gap */}
      <div className="posts flex flex-col items-center gap-6">
        {dummyPosts.map((post, i) => (
          <Post
            key={i}
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
