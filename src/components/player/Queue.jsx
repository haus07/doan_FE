import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from '../../context/PlayerContext';
import { songsData } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Play, Music2, BarChart2 } from "lucide-react";

// Component nhỏ tạo hiệu ứng sóng nhạc
const PlayingVisualizer = () => {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4].map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-green-500 rounded-t-sm"
          animate={{
            height: ["20%", "100%", "50%", "80%", "20%"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: bar * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Queue = () => {
    const { track, playWithId } = useContext(PlayerContext);
    const [queueList, setQueueList] = useState([]);

    // Logic: Khi đổi bài, tạo list gợi ý mới TRỪ bài đang hát ra
    useEffect(() => {
        const remainingSongs = songsData.filter(song => song.id !== track?.id);
        const shuffled = [...remainingSongs].sort(() => Math.random() - 0.5);
        setQueueList(shuffled.slice(0, 10)); // Lấy 10 bài
    }, [track]);

    // Animation cho danh sách
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="w-full lg:w-80 bg-black/40 backdrop-blur-md border-l border-white/5 text-white flex flex-col h-full">
            
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Music2 className="w-5 h-5 text-gray-400" />
                    Queue
                </h1>
                <span className="text-xs font-medium text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                    Recommended
                </span>
            </div>

            {/* NOW PLAYING SECTION */}
            <AnimatePresence mode="wait">
                {track && (
                    <motion.div
                        key={track.id} // Key change triggers animation
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="px-4 mb-6"
                    >
                        <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider px-2">Now Playing</h2>
                        
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 p-4 shadow-xl group hover:border-white/20 transition-all duration-300">
                            {/* Background blur effect */}
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500/20 rounded-full blur-3xl"></div>
                            
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="relative">
                                    <img
                                        className="w-16 h-16 rounded-md object-cover shadow-lg"
                                        src={track.image}
                                        alt={track.name}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                                        <PlayingVisualizer />
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-white truncate leading-tight mb-1">
                                        {track.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 truncate hover:text-white transition-colors cursor-pointer">
                                        {track.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEXT UP LIST */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
                <div className="px-4 sticky top-0 bg-[#121212]/95 backdrop-blur z-10 py-2 mb-2">
                     <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Up</h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-1 pb-4"
                >
                    {queueList.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${index}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => playWithId(item.id)}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all group relative"
                        >
                            {/* Number & Play Icon Overlay */}
                            <div className="relative w-10 h-10 flex-shrink-0">
                                <img
                                    className="w-full h-full rounded object-cover shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded">
                                    <Play className="w-4 h-4 text-white fill-current" />
                                </div>
                            </div>

                            <div className="min-w-0 flex-1 flex flex-col justify-center">
                                <p className={`text-sm font-medium truncate ${track?.id === item.id ? 'text-green-500' : 'text-gray-200 group-hover:text-white'}`}>
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate group-hover:text-gray-400">
                                    {item.desc || "Artist Name"}
                                </p>
                            </div>

                            {/* Duration & More Option */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600 group-hover:hidden">
                                    {item.duration}
                                </span>
                                <button className="hidden group-hover:block p-1 hover:text-white text-gray-400 transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Queue;