import React, { useContext , useState} from "react"
import Sidebar from './components/Sidebar'
import Player from "./components/Player"
import Display from "./components/Display"
import { PlayerContext } from './context/PlayerContext'
import Queue from "./components/Queue"
import Intro from "./components/Intro"
import DisplayArtist from "./components/DisplayArtist"


function App() {

  const { audioRef ,track } = useContext(PlayerContext);
   const [showIntro, setShowIntro] = useState(true);
  return (

    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <div className='h-screen bg-black'>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
            <Queue />
          </div>
          <Player />
          <audio ref={audioRef} src={track.file} preload="auto"></audio>  
        </div>)
      }
    </>
  )

}

export default App
