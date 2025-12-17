import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import playButton from "../../assets/playbutton.png"; // Bro không dùng cái này trong code, tôi comment lại nhé
import { PlayerContext } from "../../context/PlayerContext";
import PlayButton from "../player/PlayButton";
import PauseButton from "../player/PauseButton";

// 1. Định nghĩa kiểu dữ liệu cho Props
interface AlbumItemProps {
  image: string;
  name: string;
  desc: string;
  id: string; // Hoặc 'number' nếu ID trong database của bro là số
}

const AlbumItem = ({ image, name, desc, id }: AlbumItemProps) => {
  const navigate = useNavigate();
  
  // Lưu ý: Bro cần đảm bảo PlayerContext đã được type bên file Context
  // Nếu chưa, bro có thể dùng tạm 'any' nhưng nên fix sau: useContext<any>(PlayerContext)
  const { playStatus, pause, currentAlbumId, playAlbum } = useContext(PlayerContext);

  const isPlaying = playStatus && currentAlbumId === id;

  // 2. Tách class chung ra cho gọn code (Clean Code)
  const ACTION_BUTTON_CLASS = 
    "bg-green-500 w-12 h-12 rounded-full shadow-lg flex items-center justify-center absolute bottom-24 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 hover:scale-105";
    // Note: Tôi chỉnh lại CSS play button của Spotify một chút cho nó mượt hơn (thêm translate)

  // 3. Hàm xử lý click để tránh lặp logic stopPropagation
  const handlePlayClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
    playAlbum(id);
  };

  const handlePauseClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
    pause();
  };

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="group relative min-w-[180px] p-2 px-3 rounded hover:bg-[#ffffff26] cursor-pointer transition-colors duration-200"
    >
      <div className="relative">
        <img className="rounded w-full shadow-card mb-2" src={image} alt={name} />
        
        {/* Logic hiển thị nút Play/Pause */}
        <div className={`absolute bottom-2 right-2 transition-all duration-300 ${
            isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
        }`}>
            {isPlaying ? (
              <PauseButton
                onClick={handlePauseClick}
                className="bg-green-500 w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 hover:bg-green-400 text-black"
              />
            ) : (
              <PlayButton
                onClick={handlePlayClick}
                className="bg-green-500 w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 hover:bg-green-400 text-black"
              />
            )}
        </div>
      </div>

      <p className="font-bold mt-2 mb-1 truncate text-white">{name}</p>
      <p className="text-slate-400 text-sm line-clamp-2">{desc}</p>
    </div>
  );
};

export default AlbumItem;