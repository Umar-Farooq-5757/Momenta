import Post from '../components/Post'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const {setIsSidebarOpen} = useAppContext()
  return (
    <div onClick={()=>setIsSidebarOpen(false)} className='grow min-h-screen p-0 pt-8'>
      <h1 className='text-3xl font-bold mb-5 md:ml-3 ml-12'>All Posts</h1>
     <Post/>

    </div>
  )
}

export default Home
