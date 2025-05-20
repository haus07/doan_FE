import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import playButton from "../assets/8212668.png"; // kiểm tra lại đường dẫn nếu cần

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="group relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-full" src={image} alt={name} />

      {/* Icon play hiển thị khi hover */}
      <img
        src={playButton}
        alt="Play"
        className="w-20 h-20 absolute bottom-2 right-1 opacity-0 group-hover:opacity-100 transition duration-300"
        onClick={(e) => {
          e.stopPropagation(); // Ngăn click icon làm trigger playWithId 2 lần
          playWithId(id);
        }}
      />

      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
