import React from "react";
import { lyrics } from "../../assets/lyrics";
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { motion } from "framer-motion";

const ShowLyrics = () => {
  const { id } = useParams();
  const song = lyrics.find((item) => item.id === parseInt(id));

  // Giả lập màu nền theo bài hát (sau này bro lấy từ API)
  // Nếu chưa có thì mặc định màu tối gradient
  const bgGradient = "bg-gradient-to-b from-[#404040] to-[#121212]"; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen text-white font-sans ${bgGradient}`}
    >
      
      <div className="flex justify-center">
        <div className="w-full max-w-4xl px-8 py-10 pb-32">
          
          {/* Header tên bài hát (Optional - cho đẹp) */}
          <div className="mb-8 opacity-80">
             <h1 className="text-3xl font-black mb-1">{song?.name || "Song Title"}</h1>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Lyrics</p>
          </div>

          {/* Phần Lyrics chính */}
          <div className="space-y-8">
            <p 
                className="whitespace-pre-wrap text-2xl md:text-4xl font-bold leading-relaxed text-gray-200 tracking-tight"
                style={{ lineHeight: "1.6" }}
            >
              {song?.content || "Lyrics not available for this song."}
            </p>
          </div>

          {/* Footer nhỏ (giống Spotify hay có info bản quyền ở dưới) */}
          <div className="mt-12 pt-8 border-t border-white/10">
             <p className="text-xs text-gray-500 font-medium">
                Lyrics provided by Musixmatch
             </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ShowLyrics;