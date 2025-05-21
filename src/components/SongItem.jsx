import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";

const SongItem = ({ name, image, desc, id }) => {
    const { playStatus, playSong, pause, currentTrackId,playWithId } = useContext(PlayerContext)
    const isPlaying = playStatus && currentTrackId === id;

  return (
    <div
      onClick={() => playWithId(id)}
      className="group relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-full" src={image} alt={name} />

       {isPlaying ?
        <PauseButton 
          onClick={(e) => {
          e.stopPropagation();
          pause();
          }} 
          className="bg-green-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center
        absolute bottom-20 right-1 opacity-0 group-hover:opacity-100
        transition-opacity duration-300"
          
        />
      :
        <PlayButton onClick={(e) => {
          e.stopPropagation();
          playSong(id);
          }} className="bg-green-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center
        absolute bottom-20 right-1 opacity-0 group-hover:opacity-100
        transition-opacity duration-300" />
                    
      }

      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
