import React from "react";
import { PlayerContext } from '../context/PlayerContext'
import { useContext, useEffect, useState } from "react";
import { songsData } from "../assets/assets";



const Queue = () => {

    const { track ,playStatus ,setCurrentTrackId,currentTrackId,playWithId} = useContext(PlayerContext);
     const [randomSongs, setRandomSongs] = useState([]);
    
    
       useEffect(() => {
    const shuffled = [...songsData].sort(() => Math.random() - 0.5);
    
    setRandomSongs(shuffled.slice(0, 10));
  }, [ track.id]);
    
   return (
  <div className="w-full lg:w-80 bg-[#121212] text-white flex flex-col rounded-lg overflow-hidden h-[90vh]">
    <div className="px-6 pt-5 pb-3 border-b border-zinc-800">
      <h1 className="text-xl font-bold">Queue</h1>
    </div>

    <div className="px-6 pt-4">
      <h2 className="text-sm text-zinc-400 mb-2">Now Playing</h2>
      <div className="bg-zinc-800/50 rounded-lg p-4">
        <img
          className="w-full h-auto rounded-lg object-cover mb-3"
          src={track.image}
          alt="track cover"
        />
        <div>
          <p className="text-base font-medium text-white truncate mb-1">{track.name}</p>
          <p className="text-sm text-zinc-400 truncate">{track.desc}</p>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto mt-4">
      <div className="px-6">
        <h2 className="text-sm text-zinc-400 mb-3">Next up</h2>
      </div>

               <div className="px-6 pb-6 space-y-1">
                   
                   
                   {randomSongs.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer group"
            onClick={()=>playWithId(item.id)}       
          >
            <img
              className="w-10 h-10 rounded object-cover shadow"
              src={item.image}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate group-hover:text-white">
                {item.name}
              </p>
              <p className="text-xs text-zinc-400 truncate">
                { item.desc.slice(0, 25)}
              </p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-700 rounded">
              <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}


export default Queue