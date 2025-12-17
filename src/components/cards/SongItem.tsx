import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import PauseButton from "../player/PauseButton";
import PlayButton from "../player/PlayButton";
import { useNavigate } from "react-router-dom";

// 1. Định nghĩa Props
interface SongItemProps {
  name: string;
  image: string;
  desc: string;
  id: string; // Hoặc 'number' tùy DB của bro
  artistName: string;
}

const SongItem = ({ name, image, desc, id, artistName }: SongItemProps) => {
  
  console.log(artistName);
  const { playStatus, playSong, pause, currentTrackId } = useContext(PlayerContext);
  
  const navigate = useNavigate();
  const isPlaying = playStatus && currentTrackId === id;

  // 3. Tách logic xử lý click
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSong(id);
  };

  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    pause();
  };

  // 4. CSS cho nút Play/Pause (Style chuẩn Spotify)
  const BUTTON_CLASS = 
    "bg-green-500 w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 hover:bg-green-400 text-black transition-transform duration-200";

  return (
    <div
      className="group relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors duration-200"
      onClick={() => navigate(`/song/${id}`)}
    >
      {/* Wrapper cho Image để định vị nút Play dễ hơn */}
      <div className="relative mb-2">
        <img className="rounded w-full shadow-md" src={image} alt={name} />

        {/* Nút Play/Pause: Hiện ra khi hover vào group cha */}
        <div 
          className={`absolute bottom-2 right-2 transition-all duration-300 ${
            isPlaying 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          {isPlaying ? (
            <PauseButton onClick={handlePause} className={BUTTON_CLASS} />
          ) : (
            <PlayButton onClick={handlePlay} className={BUTTON_CLASS} />
          )}
        </div>
      </div>

      <p className="font-bold mt-2 mb-1 truncate text-white">{name}</p>
      <p className="text-slate-400 text-sm line-clamp-2">{artistName}</p>
    </div>
  );
};

export default SongItem;