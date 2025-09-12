import React, { useState } from "react";
import UserCard from "../components/UserCard";
import { useAppContext } from "../context/AppContext";
import { dummyUsers } from "../assets/assets";
import { MdErrorOutline } from "react-icons/md";

const Search = () => {
  const {isDark,setIsSidebarOpen} = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="grow min-h-screen my-3  md:my-0 pt-12 md:pt-8 px-0 md:px-6 lg:px-8"
    >
      {/* Search bar */}
      <div className={`flex items-center mb-10 mx-2 text-sm ${isDark?'bg-black':'bg-white'} h-12 border pl-2 rounded border-gray-500/30 w-[95%] max-w-screen`}>
        <input
          className={`px-2  w-full h-full outline-none text-gray-500 bg-transparent ${isDark?'placeholder:text-gray-500':''}`}
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
        <svg
          className="mr-3"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5m9-10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Users */}
      <section className="px-1 sm:px-2 min-h-[70vh]">
        {dummyUsers.length>0?
        dummyUsers.filter((user)=>user.username.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user,i)=>{
          return (
        <UserCard key={i} username={user.username}/>

          )
        }):
        <div className="flex items-center text-2xl sm:text-3xl text-gray-400 gap-3"><MdErrorOutline className="size-10"/> No users found</div>
        }
      </section>
    </div>
  );
};

export default Search;
