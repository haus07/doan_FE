import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from '../../context/PlayerContext';
import { songsData } from "../../assets/assets";
import { motion } from "framer-motion";
import { Play, PlusCircle, MoreHorizontal, Heart, ListMusic } from "lucide-react";

const Queue = () => {
    const { track, playWithId } = useContext(PlayerContext);
    const [queueList, setQueueList] = useState([]);

    useEffect(() => {
        if (track) {
            const remainingSongs = songsData.filter(song => song.id !== track.id);
            const shuffled = [...remainingSongs].sort(() => Math.random() - 0.5);
            setQueueList(shuffled.slice(0, 5)); 
        }
    }, [track]);

    if (!track) return null;

    return (
        <div className="w-full h-full m-2 px-6 pt-4 lg:w-80 rounded-lg bg-[#121212] text-white flex flex-col overflow-y-auto custom-scrollbar p-4 border-l border-white/5 font-sans ">
            
            {/* --- PHẦN 1: TÊN DANH SÁCH --- */}
           

            {/* --- PHẦN 2: NOW PLAYING CARD --- */}
            <div className="mb-8 group">
                {/* 2.1 Hình ảnh (Album Art / Video Thumbnail) */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl mb-4">
                    <img 
                        src={track.image} 
                        alt={track.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay hiệu ứng khi hover */}
                    

                    {/* Badge Live (Optional) */}
                    <div className="absolute top-3 right-3">
                         <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                            <img src={track.image} className="w-4 h-4 rounded-full inline-block mr-1 opacity-80" />
                            <span className="text-[10px] font-bold tracking-wide">ARTIST</span>
                         </div>
                    </div>
                </div>

                {/* 2.2 Thông tin bài hát (Dưới hình) */}
                <div className="flex items-start justify-between px-1">
                    {/* Bên trái: Tên bài + Nghệ sĩ */}
                    <div className="flex-1 min-w-0 mr-4">
                        <h2 className="text-2xl font-bold leading-tight truncate hover:underline cursor-pointer text-white mb-1">
                            {track.name}
                        </h2>
                        <p className="text-gray-400 font-medium text-sm truncate hover:text-white hover:underline cursor-pointer transition-colors">
                            {track.desc || "Unknown Artist"}
                        </p>
                    </div>

                    {/* Bên phải: Nút Tim + Menu */}
                    <div className="flex items-center gap-3 pt-1">
                        <Heart 
                            size={22} 
                            className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors active:scale-90" 
                        />
                        <MoreHorizontal 
                            size={22} 
                            className="text-gray-400 hover:text-white cursor-pointer transition-colors" 
                        />
                    </div>
                </div>
            </div>

            {/* --- PHẦN 3: UP NEXT LIST --- */}
            <div className="flex flex-col gap-2">
                {queueList.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => playWithId(item.id)}
                        className="flex gap-3 p-2 rounded-md hover:bg-[#2A2A2A] cursor-pointer group transition-colors relative"
                    >
                        {/* Music Note Icon khi hover (Thay vì số thứ tự) */}
                        <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded bg-[#282828]">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={12} fill="white" className="text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center min-w-0 flex-1">
                            <p className={`font-medium text-sm truncate ${track.id === item.id ? 'text-green-500' : 'text-gray-200 group-hover:text-white'}`}>
                                {item.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate group-hover:text-gray-400">
                                {item.desc || "Unknown Artist"}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Queue;