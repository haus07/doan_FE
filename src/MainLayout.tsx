import React, { useContext } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet nếu bro muốn dùng thay cho Display cứng

// Components
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import Player from "./components/player/Player";
import Display from "./components/display/Display"; // Giữ nguyên Display vỏ bọc như ý bro
import Queue from "./components/player/Queue";

// Context
import { PlayerContext } from "./context/PlayerContext";

const MainLayout = () => {
  const playerContext = useContext(PlayerContext);
  
  // Safe access: Nếu context null thì track là undefined
  const track = playerContext?.track;

  return (
    <div className="h-screen bg-black relative overflow-hidden flex flex-col">
      
      {/* 1. Navbar nằm trên cùng */}
      <Navbar />
      
      {/* 2. Lớp nền mờ ảo diệu (Background Blur Effect) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 transition-all duration-1000 ease-in-out pointer-events-none"
        style={{
           // Chỉ set url nếu track và track.image tồn tại
           backgroundImage: track?.image ? `url(${track.image})` : 'none',
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           filter: 'blur(30px) brightness(0.7)' // Tăng blur lên 30px cho mượt hơn, giảm brightness để chữ trắng dễ đọc
        }}
      />
      
      {/* 3. Lớp gradient phủ lên để tăng độ tương phản */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-black/40 pointer-events-none" />

      {/* 4. Nội dung chính (Sidebar - Display - Queue) */}
      {/* flex-1 để chiếm hết chiều cao còn lại sau khi trừ Navbar và Player */}
      <div className="flex-1 flex relative z-10 overflow-hidden px-2 pb-2 gap-2">
        <Sidebar />
        
        {/* Display là container chính chứa các Route con (Home, Album, etc.) */}
        <Display /> 
        
        {/* Queue (Danh sách phát bên phải - Optional) */}
        <div className="hidden xl:block">
            <Queue />
        </div>
      </div>

      {/* 5. Player Bar (Luôn nổi ở dưới cùng) */}
      <div className="relative z-20 w-full">
          <Player />
      </div>

    </div>
  );
};

export default MainLayout;