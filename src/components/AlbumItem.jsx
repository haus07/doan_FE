import React from "react";
import { useNavigate } from "react-router-dom";
import playButton from "../assets/8212668.png"; // điều chỉnh path nếu cần

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="group relative min-w-[180px] p-2 px-3 rounded hover:bg-[#ffffff26] cursor-pointer"
    >
      <img className="rounded w-full" src={image} alt={name} />

      {/* Icon ở góc phải dưới */}
      <img
        src={playButton}
        alt="Play"
        className="w-20 h-20 absolute bottom-20 right-1 opacity-0 group-hover:opacity-100 transition duration-300"
        onClick={(e) => {
          e.stopPropagation(); // chặn click album nếu bấm nút
          console.log("Clicked Play"); // hoặc xử lý phát nhạc
        }}
      />

      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
