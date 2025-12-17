import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets, songsData } from "../../assets/assets";
import { PlayerContext } from '../../context/PlayerContext';

// 1. Interfaces
interface Song {
  id: number | string;
  name: string;
  image: string;
  desc: string;
}

// 2. Sub-components
const ActionCard = ({ title, subtitle, buttonText }: { title: string, subtitle: string, buttonText: string }) => (
  <motion.div
    className="p-4 bg-[#242424] rounded-lg flex flex-col items-start gap-3 mt-4"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <h1 className="text-white font-bold text-[15px]">{title}</h1>
    <p className="text-sm text-gray-400 font-light">{subtitle}</p>
    <button className="px-4 py-1.5 bg-white text-black text-[14px] font-bold rounded-full hover:scale-105 transition-transform">
      {buttonText}
    </button>
  </motion.div>
);

const LibrarySongItem = ({ song, onClick }: { song: Song, onClick: (id: any) => void }) => (
  <motion.div
    className="flex items-center gap-3 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer group transition-colors"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={() => onClick(song.id)}
  >
    <img
      src={song.image}
      alt={song.name}
      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
    />
    <div className="flex flex-col overflow-hidden min-w-0">
      <p className="text-white text-sm font-medium truncate group-hover:text-green-400 transition-colors">
        {song.name}
      </p>
      <p className="text-gray-400 text-xs truncate">
        Song • {song.desc}
      </p>
    </div>
  </motion.div>
);

// --- Main Sidebar Component ---
const Sidebar = () => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      
      {/* --- Library Section --- */}
      <div className="bg-[#121212] h-[100%] rounded-lg flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 flex items-center justify-between shadow-md z-10 bg-[#121212]">
          <div className="flex items-center gap-3 cursor-pointer hover:text-white text-gray-400 transition-colors">
            <img className="w-6 opacity-70 invert" src={assets.stack_icon} alt="Library" />
            <p className="font-bold text-md">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="w-4 cursor-pointer opacity-70 hover:opacity-100 invert"
              src={assets.plus_icon}
              alt="Add"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="w-4 cursor-pointer opacity-70 hover:opacity-100 invert"
              src={assets.arrow_icon}
              alt="Expand"
            />
          </div>
        </div>

        {/* Categories / Filter Pills (Optional - giống Spotify mới) */}
        <div className="px-4 pb-2 flex gap-2">
            <span className="bg-[#2A2A2A] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#3E3E3E] cursor-pointer transition">Playlists</span>
            <span className="bg-[#2A2A2A] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#3E3E3E] cursor-pointer transition">Artists</span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
          
          {/* CTA Cards */}
          <ActionCard
            title="Create your first playlist"
            subtitle="It's easy, we'll help you"
            buttonText="Create playlist"
          />
          
          <ActionCard
            title="Let's find some podcasts to follow"
            subtitle="We'll keep you updated on new episodes"
            buttonText="Browse podcasts"
          />

          {/* Songs List */}
          <div className="mt-6 px-2">
            <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Recently Added</h3>
                <img src={assets.search_icon} className="w-4 opacity-50 hover:opacity-100 invert cursor-pointer" />
            </div>
            
            <div className="flex flex-col gap-1">
              {songsData.map((song: any, index: number) => (
                <LibrarySongItem key={song.id || index} song={song} onClick={playWithId} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;