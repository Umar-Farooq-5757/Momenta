import "./App.css";
import Sidebar from "./components/Sidebar";
import { useAppContext } from "./context/AppContext";

function App() {
  const {isDark} = useAppContext()
  return (
    <main className={`${isDark?'bg-black text-white':'bg-white text-black'} transition-all`}>
      <Sidebar/>
    </main>
  )
}

export default App;
