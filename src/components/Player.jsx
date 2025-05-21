import React, { useContext } from "react";
import { assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext'
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import { Link, useNavigate } from "react-router-dom";

const Player = () => {

    const { track,seekBar, seekBg ,playStatus ,play,pause,time,previous,next,seekSong,volume,handleVolumeChange } = useContext(PlayerContext);
    const navigate = useNavigate();
    return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-6 border-t border-gray-800">
        {/* Left side - Track info */}
        <div className="hidden lg:flex items-center gap-4 flex-1 min-w-0">
            <img className="w-14 h-14 rounded shadow-md" src={track.image} alt="" />
            <div className="overflow-hidden">
                <p className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">{track.desc.slice(0,12)}</p>
            </div>
        </div>
        
        {/* Center - Player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
            <div className="flex items-center gap-6">
                <img className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.shuffle_icon} alt="" />
                <img onClick={previous} className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" src={assets.prev_icon} alt="" />
              <div className="group relative rounded-full p-2 hover:scale-105 transition-transform">
  {playStatus ? (
                            <PauseButton onClick={pause}
     className="bg-green-500 w-9 h-9 rounded-full shadow-lg flex items-center justify-center cursor-pointer "
                            />
  ) : (
    <PlayButton
      onClick={play}
     className="bg-green-500 w-9 h-9 rounded-full shadow-lg flex items-center justify-center cursor-pointer "

    />
  )}
</div>

                <img onClick={next} className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" src={assets.next_icon} alt="" />
                <img className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.loop_icon} alt="" />
            </div>
            <div className="flex items-center gap-2 w-full">
                <p className="text-xs text-gray-400 w-10 text-right">{time.currentTime.minute}:{time.currentTime.second<10?"0"+time.currentTime.second:time.currentTime.second}</p>
                <div ref={seekBg} onClick={seekSong} className="flex-grow h-1  bg-gray-600 hover:bg-gray-500 rounded-full cursor-pointer group relative">
                    <div ref={seekBar} className="h-1 bg-green-500 hover:bg-green-400 rounded-full relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"></div>
                    </div>
                </div>
                <p className="text-xs text-gray-400 w-10">{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
        </div>
        
        {/* Right side - Volume controls */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <img onClick={()=>navigate(`/showlyrics/${track.id}`)} className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.mic_icon} alt="" />
            
            <img className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.queue_icon} alt="" />
            <img className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.speaker_icon} alt="" />
            <div className="flex items-center gap-1">
                <img className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.volume_icon} alt="" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 
                             [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:bg-white 
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-110"
                />
            </div>
            <img className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer ml-2" src={assets.mini_player_icon} alt="" />
            <img className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" src={assets.zoom_icon} alt="" />
        </div>
    </div>
)
}

export default Player