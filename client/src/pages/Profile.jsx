import profilePic from "../assets/profile.avif";
import { useAppContext } from "../context/AppContext";
import assets from "../assets/assets.js";

const Profile = () => {
  const { isDark,setIsSidebarOpen } = useAppContext();
  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3 md:my-0 pt-16 px-0 md:px-6 lg:px-8"
    >
      {/* Profile picture, username, followers e.t.c. */}
      <section className=" px-3 sm:px-12 md:px-0 xl:px-20">
        <div className="flex items-center gap-4 sm:gap-12">
          <img className={`size-20 sm:size-28 md:size-32 rounded-full ${isDark?'invert':''}`} src={profilePic} alt="" />
         <div>
            <h1 className="text-xl sm:text-3xl font-semibold mb-0 sm:mb-2">Username here</h1>
            <p><span className={`font-semibold ${isDark?'text-[#ffff00]':'text-[#c7961c]'} text-md mr-1`}>5.5M</span> followers</p>
            <p><span className={`font-semibold ${isDark?'text-[#ffff00]':'text-[#c7961c]'} text-md mr-1`}>57</span> following</p>
            <p><span className={`font-semibold ${isDark?'text-[#ffff00]':'text-[#c7961c]'} text-md mr-1`}>129</span> posts</p>
          </div>
        </div>
        <p className="my-3 sm:my-5 text-sm">Full stack web developer | Software engineer</p>
      </section>
    {/* Posts */}
      <section className="px-3 sm:px-12 md:px-0 xl:px-20">
        <h2 className="font-semibold text-lg sm:text-2xl mb-4">Posts:</h2>
        <div className="grid justify-center grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-3">
          {assets.map((pic,index)=>{
      return (
        <div key={index} className="size-20 sm:size-32 md:size-36 lg:size-40 my-1 transition-all hover:scale-105 post rounded-md overflow-hidden max-w-38 flex justify-center items-center">
          <picture className="size-24 sm:size-32 md:size-36 lg:size-40 my-1 transition-all hover:scale-105 post rounded-md overflow-hidden max-w-38 flex justify-center items-center">
        <source srcSet={pic} type="image/avif" />
        <img className="w-full h-full rounded-md object-cover object-center" src={pic} alt="post" loading="lazy" />
      </picture>
          </div>)})}
        </div>
      </section>
    </div>
  );
};

export default Profile;
