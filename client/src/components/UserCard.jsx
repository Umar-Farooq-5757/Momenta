import React from 'react'
import { SlUserFollow } from "react-icons/sl";
import profilePic from '../assets/profile.avif'
import { useAppContext } from '../context/AppContext';

const UserCard = ({username}) => {
    const {isDark} = useAppContext()
  return (
    <div className={`my-5 flex items-center justify-between hover:scale-[1.008] ${isDark?'hover:border-[#c7961c] hover:bg-[#1a1a1a]':'hover:border-gray-300 hover:bg-gray-100'}  transition-all border ${isDark?'border-[#474747]':'border-gray-200'} px-3 py-2 rounded-sm`}>
      <div className='flex justify-start items-center gap-2 sm:gap-3 '>
        <img className={`size-7 sm:size-9 rounded-full ${isDark?'invert':''}`} src={profilePic} alt="profile pic" />
        <h2 className='text-[13px] sm:text-[16px]'>{username}</h2>
      </div>
      <button type="button" className={`sm:text-[13px] flex items-center gap-2.5 border border-gray-500/30 px-2 py-1 sm:px-4 sm:py-2 text-sm text-gray-800 rounded  hover:text-[#c7961c]  ${isDark?'hover:border-[#ffff00] bg-black text-white hover:bg-[#fff5dc]':'hover:border-[#c7961c] bg-white hover:bg-[#fff5dc]'} active:scale-95 transition`}>
                <SlUserFollow className='size-3 sm:size-4'/>
                Follow
            </button>
    </div>
  )
}

export default UserCard