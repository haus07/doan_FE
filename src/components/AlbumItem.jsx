import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import playButton from "../assets/playbutton.png";
import { PlayerContext } from "../context/PlayerContext";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

const AlbumItem = ({ image, name, desc, id }) => {
  const { playStatus, play, pause, currentTrackId ,currentAlbumId,playAlbum} = useContext(PlayerContext)
  const isPlaying = playStatus && currentAlbumId === id;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="group relative min-w-[180px] p-2 px-3 rounded hover:bg-[#ffffff26] cursor-pointer"
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
          playAlbum(id);
          }} className="bg-green-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center
        absolute bottom-20 right-1 opacity-0 group-hover:opacity-100
        transition-opacity duration-300" />
                    
      }


      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
