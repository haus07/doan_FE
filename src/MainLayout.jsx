import React, { useContext } from "react";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import Player from "./components/player/Player";
import Display from "./components/display/Display"; // Import cái Display vỏ bọc vừa sửa
import { PlayerContext } from "./context/PlayerContext";
import Queue from "./components/player/Queue";

const MainLayout = () => {
  const { track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      <Navbar/>
      
      {/* 1. Lớp nền mờ ảo diệu */}
      <div 
        className="absolute inset-0 z-0 opacity-40 transition-all duration-1000 ease-in-out"
        style={{
           backgroundImage: `url(${track?.image})`,
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           filter: 'blur(10px) brightness(1)' // Làm mờ cực mạnh
        }}
      />
      
      {/* 2. Lớp gradient phủ lên để vẫn đọc được chữ */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-black/30" />

      {/* Nội dung chính (đặt z-index cao hơn để nổi lên trên) */}
      <div className="h-[83%] flex relative z-10">
        <Sidebar />
        <Display /> 
        <Queue />
      </div>
      <div className="relative z-10">
          <Player />
      </div>
    </div>
  );
};

export default MainLayout;