import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import "./PremiumButton.css"; 
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <Link to="/" className="flex items-cennter gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </Link>
       <Link to="/search" className="flex items-center gap-3 pl-8 cursor-pointer">
  <img className="w-6" src={assets.search_icon} alt="" />
  <p className="font-bold">Search</p>
</Link>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we will help you</p>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
            }}
            className="relative rounded-full overflow-hidden cursor-pointer mt-4 inline-block"
          >
            <div className="shiny-border" />
            <button className="relative px-4 py-1.5 bg-white text-[15px] text-black rounded-full z-10">
              Create Playlist
            </button>
          </motion.div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Let's findsome podcasts to follow</h1>
          <p className="font-light">We'll keep you update on new episodes</p>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
            }}
            className="relative rounded-full overflow-hidden cursor-pointer mt-4 inline-block"
          >
            <div className="shiny-border" />
            <button className="relative px-4 py-1.5 bg-white text-[15px] text-black rounded-full z-10">
              Browse podcast
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
