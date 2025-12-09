import React, { useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Shuffle, MoreHorizontal, Clock, Heart } from "lucide-react";

// Assets & Context
import { albumsData } from "../../assets/assets"; // Giả sử songsData không dùng thì bỏ
import PlayerContextProvider, { PlayerContext } from "../../context/PlayerContext";
import playsIcon from "../../assets/play.png";
import musicPlaying from "../../assets/hinh/musicplaying.gif";

// Components
import PlayButton from "../player/PlayButton";
import PauseButton from "../player/PauseButton";

// Services
import { useHandleGetArtistDetail } from "../../services/artists/artistService";

const DisplayArtist = () => {
  const { id } = useParams();
  const { data: artistDetail, isLoading, isError } = useHandleGetArtistDetail(id);
  const { playWithId, currentSong, playStatus, pause , setSongsData} = useContext(PlayerContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [songPlaying, setSongPlaying] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Constants
  const VISIBLE_COUNT = 5;
  
  // Safely access album data (Optional chaining để tránh crash nếu id không khớp)
  const albumData = albumsData[id] || { name: "Single" };

  // Memoize description để không tạo lại string mỗi lần render
  const { description, description2 } = useMemo(() => {
    return {
      description: `${artistDetail?.name || 'Artist'} is a popular singer known for their dreamy melodies...`,
      description2: `With hits like ${artistDetail?.songs?.[0]?.name || '...'} and ${artistDetail?.songs?.[1]?.name || '...'}, they established...`
    };
  }, [artistDetail]);

  // Helper function check current song
  const isCurrentSong = (songId) => currentSong?.id === songId;

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // 2. Handle Error State
  if (isError || !artistDetail) {
    return <div className="text-white text-center mt-20">Artist not found.</div>;
  }

  return (
    <motion.div
      className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white lg:-m-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- HEADER SECTION --- */}
      <div className="relative h-[40vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${artistDetail.image_detail_url})`,
          }}
        >
           {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#121212]" />
        </div>

        <div className="absolute bottom-10 left-8 z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 mb-4"
          >
             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            <span className="text-sm font-medium uppercase tracking-wider">Verified Artist</span>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {artistDetail.name}
          </motion.h1>
          
          <p className="text-lg text-gray-200 font-medium">
            {Number(7777777).toLocaleString()} monthly listeners
          </p>
        </div>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="px-8 py-6 flex items-center gap-6">
        <div onClick={playStatus ? pause : () => playWithId(artistDetail.songs[0]?.id)}>
             {playStatus ? (
                <PauseButton className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-lg hover:scale-105 transition w-14 h-14 flex items-center justify-center" />
             ) : (
                <PlayButton className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-lg hover:scale-105 transition w-14 h-14 flex items-center justify-center" />
             )}
        </div>

        <button className="px-6 py-2 border border-gray-600 rounded-full text-sm font-bold uppercase tracking-widest hover:border-white hover:scale-105 transition">
          Follow
        </button>
        
        <button className="text-gray-400 hover:text-white transition">
            <MoreHorizontal size={32} />
        </button>
      </div>

      {/* --- POPULAR SONGS LIST --- */}
      <div className="px-8 py-4">
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <div className="flex flex-col gap-2">
          {(showAll ? artistDetail.songs : artistDetail.songs.slice(0, VISIBLE_COUNT)).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => { playWithId(item.id); setSongPlaying(item.id); }}
              className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_2fr_1fr_auto] items-center gap-4 p-3 rounded-md cursor-pointer transition group
                ${isCurrentSong(item.id) ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              {/* Index / Play Icon */}
              <div className="w-8 text-center flex justify-center text-gray-400">
                {hoveredIndex === index ? (
                   <Play size={16} fill="currentColor" className="text-white" />
                ) : isCurrentSong(item.id) && playStatus ? (
                   <img src={musicPlaying} alt="playing" className="w-4 h-4" />
                ) : (
                   <span className="font-mono">{index + 1}</span>
                )}
              </div>

              {/* Song Info */}
              <div className="flex items-center gap-4 min-w-0">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover shadow-sm" />
                <div className="truncate">
                  <p className={`font-medium truncate ${isCurrentSong(item.id) ? 'text-green-500' : 'text-white'}`}>
                    {item.name}
                  </p>
                </div>
              </div>

              {/* Album / Views (Hidden on mobile) */}
              <div className="hidden md:block text-gray-400 text-sm truncate">
                 {/* Fallback to artist name if album not found in local data */}
                 { artistDetail.name}
              </div>

              {/* Duration / Heart */}
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                 <Heart size={16} className="hidden group-hover:block hover:text-green-500 transition" />
                 <span>{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {artistDetail.songs.length > VISIBLE_COUNT && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider pl-4"
          >
            {showAll ? 'Show Less' : 'See More'}
          </button>
        )}
      </div>

      {/* --- DISCOGRAPHY GRID (Optional - Cleaned up) --- */}
      <div className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Discography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {artistDetail.songs.slice(0, 5).map((item, index) => (
                <div key={index} className="group p-3 bg-[#181818] hover:bg-[#282828] rounded-md transition duration-300 cursor-pointer">
                    <div className="relative mb-4 shadow-lg">
                        <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-md" />
                        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                             <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-105 text-black">
                                <Play fill="currentColor" size={20} />
                             </div>
                        </div>
                    </div>
                    <h3 className="font-bold text-white truncate mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">By {artistDetail.name}</p>
                </div>
             ))}
        </div>
      </div>


      {/* --- ABOUT SECTION --- */}
      <div className="px-8 py-8 pb-20">
        <h2 className="text-2xl font-bold mb-6">About</h2>
        <div 
            className="rounded-xl p-8 relative overflow-hidden h-[500px] group cursor-pointer"
            style={{ backgroundImage: `url(${artistDetail.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
             
             <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="font-bold text-xl mb-2">
                    {Number(1025291).toLocaleString()} monthly listeners
                </div>
                <p className="text-gray-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {description} {description2}
                </p>
             </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DisplayArtist;