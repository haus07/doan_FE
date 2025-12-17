import React from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

// 1. Định nghĩa Interface
interface ArtistProps {
  id: string | number;
  img: string;
  name: string;
  role?: string; // Optional, mặc định là "Artist"
  // albumID: Bro không dùng prop này trong logic, tôi đã xóa cho code sạch
}

const Artist = ({ id, img, name, role = "Artist" }: ArtistProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="group relative min-w-[180px] p-3 rounded-lg hover:bg-[#181818] cursor-pointer transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative mb-4">
        <img 
            className="w-full aspect-square object-cover rounded-full shadow-lg shadow-black/50 group-hover:scale-105 transition-transform duration-300" 
            src={img} 
            alt={name} 
        />
        
        {/* Play Button (Optional - Hiện khi hover giống Spotify) */}
        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-10">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                <Play fill="black" size={20} className="ml-1" />
            </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <p className="font-bold text-white text-base truncate mb-1">{name}</p>
        <span className="text-gray-400 text-sm font-medium capitalize truncate">{role}</span>
      </div>
    </div>
  );
};

export default Artist;