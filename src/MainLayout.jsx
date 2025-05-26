// MainLayout.jsx
import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import Queue from "./components/Queue";
import { PlayerContext } from "./context/PlayerContext";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
        <div className="flex-1 overflow-auto p-6">
          {/* Nội dung con sẽ hiển thị ở đây */}
          <Outlet />
        </div>
        <Queue />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
}

export default MainLayout;
