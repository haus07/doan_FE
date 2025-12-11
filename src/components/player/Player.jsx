import React, { useContext, useState } from "react";
import { PlayerContext } from '../../context/PlayerContext';
import { useNavigate } from "react-router-dom";
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Mic2, ListMusic, MonitorSpeaker, Maximize2, Minimize2,
  Volume2, Volume1, VolumeX 
} from "lucide-react";

const Player = () => {
  const { 
    track, seekBar, seekBg, playStatus, play, pause, 
    time, previous, next, seekSong, volume, handleVolumeChange 
  } = useContext(PlayerContext);
  
  const navigate = useNavigate();
  const [isLyricsActive, setIsLyricsActive] = useState(false);

  // Helper để chọn icon volume
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  const toggleLyrics = () => {
    if (isLyricsActive) {
      navigate(-1); // Quay lại trang trước
    } else {
      navigate(`/showlyrics/${track.id}`);
    }
    setIsLyricsActive(!isLyricsActive);
  };

  return (
    <div className="h-full bg-black flex justify-between items-center text-white px-4">
        
        {/* --- LEFT: TRACK INFO --- */}
        <div className="hidden lg:flex items-center gap-4 w-[30%] min-w-[180px]">
            <img className="w-14 h-14 rounded-md shadow-lg object-cover" src={track.image} alt={track.name} />
            <div className="flex flex-col justify-center overflow-hidden">
                <p className="font-medium text-sm text-white truncate hover:underline cursor-pointer">{track.name}</p>
                <p className="text-xs text-gray-400 truncate hover:text-white hover:underline cursor-pointer">
                    {track.desc || "Artist Name"}
                </p>
            </div>
             {/* Add Heart Icon here if you want */}
        </div>
        
        {/* --- CENTER: CONTROLS & SEEK BAR --- */}
        <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
            {/* Control Buttons */}
            <div className="flex items-center gap-4 mb-1">
                <Shuffle size={16} className="text-gray-400 hover:text-white cursor-pointer transition" />
                
                <SkipBack 
                    onClick={previous} 
                    size={20} 
                    className="text-gray-300 hover:text-white cursor-pointer fill-current transition" 
                />
                
                {/* Play/Pause Button (White Circle) */}
                <div 
                    onClick={playStatus ? pause : play}
                    className="bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition-transform active:scale-95"
                >
                    {playStatus ? (
                        <Pause size={20} fill="black" className="text-black ml-[1px]" />
                    ) : (
                        <Play size={20} fill="black" className="text-black ml-[2px]" />
                    )}
                </div>

                <SkipForward 
                    onClick={next} 
                    size={20} 
                    className="text-gray-300 hover:text-white cursor-pointer fill-current transition" 
                />
                
                <Repeat size={16} className="text-gray-400 hover:text-white cursor-pointer transition" />
            </div>

            {/* Seek Bar Row */}
            <div className="flex items-center gap-2 w-full max-w-xl">
                <span className="text-xs text-gray-400 w-8 text-right font-variant-numeric tabular-nums">
                    {time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}
                </span>
                
                <div 
                    ref={seekBg} 
                    onClick={seekSong} 
                    className="group relative flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
                >
                    <div 
                        ref={seekBar} 
                        className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                    >
                        {/* Drag Handle (Only shows on group hover) */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <span className="text-xs text-gray-400 w-8 font-variant-numeric tabular-nums">
                    {time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}
                </span>
            </div>
        </div>
        
        {/* --- RIGHT: EXTRA CONTROLS --- */}
        <div className="hidden lg:flex items-center justify-end w-[30%] gap-3">
            {/* Lyrics Button */}
            <Mic2 
                onClick={toggleLyrics}
                size={18} 
                className={`cursor-pointer transition hover:text-white ${isLyricsActive ? 'text-green-500' : 'text-gray-400'}`} 
            />
            
            <ListMusic size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
            <MonitorSpeaker size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
            
            {/* Volume Control */}
            <div className="flex items-center gap-2 w-32 group">
                <div className="text-gray-400 group-hover:text-white transition">
                    <VolumeIcon />
                </div>
                
                <div className="h-1 flex-1 bg-gray-600 rounded-full relative cursor-pointer overflow-hidden">
                    {/* Input Range ẩn đè lên trên để kéo thả được */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {/* Visual Bar */}
                    <div 
                        className="h-full bg-gray-400 group-hover:bg-green-500 rounded-full" 
                        style={{ width: `${volume * 100}%` }}
                    />
                </div>
            </div>

            <Minimize2 size={16} className="text-gray-400 hover:text-white cursor-pointer transition ml-2" />
        </div>
    </div>
  );
}

export default Player;