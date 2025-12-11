import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets, songsData } from "../../assets/assets"; // Đảm bảo import songsData
import { PlayerContext } from './../../context/PlayerContext';
import { useContext } from "react"

// --- Sub-components ---

// 1. Navigation Item (Home, Search)
const NavItem = ({ to, icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay, duration: 0.3 }}
  >
    <Link
      to={to}
      className="flex items-center gap-4 pl-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#ffffff1a] group"
    >
      <motion.img
        className="w-6 opacity-70 group-hover:opacity-100 transition-opacity"
        src={icon}
        alt={label}
        whileHover={{ scale: 1.1 }}
      />
      <p className="font-bold text-gray-400 group-hover:text-white transition-colors">
        {label}
      </p>
    </Link>
  </motion.div>
);

// 2. Call to Action Card (Create Playlist, Podcasts)
const ActionCard = ({ title, subtitle, buttonText }) => (
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

// 3. Mini Song Item (Hiển thị mock data trong thư viện)
const LibrarySongItem = ({ song , onClick }) => (
  <motion.div
    
    className="flex items-center gap-3 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer group transition-colors"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    
  >
    <img
      src={song.image}
      alt={song.name}
      className="w-10 h-10 rounded-md object-cover"
    />
    <div className="flex flex-col overflow-hidden">
      <p className="text-white text-sm font-medium truncate group-hover:text-green-400 transition-colors">
        {song.name}
      </p>
      <p className="text-gray-400 text-xs truncate max-w-[150px]">
        {song.desc}
      </p>
    </div>
  </motion.div>
);

// --- Main Sidebar Component ---

const Sidebar = () => {


  const { playWithId } = useContext(PlayerContext)
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      
      {/* --- Top Section: Navigation --- */}
  

      {/* --- Bottom Section: Library --- */}
      <div className="bg-[#121212] h-[100%] rounded-lg flex flex-col overflow-hidden">
        
        {/* Library Header */}
        <div className="p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3 cursor-pointer hover:text-white text-gray-400 transition-colors">
            <img className="w-6 opacity-70" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="w-4 cursor-pointer opacity-70 hover:opacity-100"
              src={assets.plus_icon}
              alt="Add"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="w-4 cursor-pointer opacity-70 hover:opacity-100"
              src={assets.arrow_icon}
              alt="Expand"
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-hide">
          
          {/* Default CTA Cards */}
          <ActionCard
            title="Create your first playlist"
            subtitle="It's easy, we'll help you"
            buttonText="Create playlist"
          />
          

          {/* Render Mock Data (Songs List) */}
          <div className="mt-6 px-2">
            <h3 className="text-xs text-gray-400 font-bold mb-3 uppercase tracking-wider">
              Recently Added
            </h3>
            <div className="flex flex-col gap-1">
              {songsData.map((song, index) => (
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