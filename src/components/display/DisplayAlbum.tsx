import React, { useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import { albumsData, songsData, assets } from '../../assets/assets';
import musicPlaying from "../../assets/hinh/musicplaying.gif";
import { motion } from "framer-motion";
import { Clock, Heart, MoreHorizontal, Play, Pause } from "lucide-react";
import { useGetAlbumDetail } from "@/services/albumService";
import { LikeButton } from "../common/LikeButton";

// 1. Interface cho Mock Data (More by Artist)
interface MoreAlbum {
  id: number;
  name: string;
  year: string;
  image: string;
}

const DisplayAlbum = () => {
  const { id } = useParams<{ id: string }>();
  // Lưu ý: Đảm bảo Context đã được type hoặc chấp nhận any tạm thời
  const { playWithId, currentSong, pause, playStatus } = useContext(PlayerContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- DATA LOGIC ---
  // Tìm album hiện tại. Chuyển id sang số nếu cần thiết
  const { data: albumData, isLoading, isError } = useGetAlbumDetail(id);
  console.log(albumData)

 

  // Mock Widget "More by Artist"
  const moreAlbums: MoreAlbum[] = [
    { id: 2, name: "Justice", year: "2021", image: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png" },
    { id: 3, name: "Purpose", year: "2015", image: "https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png" },
    { id: 4, name: "Changes", year: "2020", image: "https://upload.wikimedia.org/wikipedia/en/1/16/Justin_Bieber_-_Changes.png" },
    { id: 5, name: "Believe", year: "2012", image: "https://upload.wikimedia.org/wikipedia/en/0/0a/Justin_Bieber_-_Believe.png" },
  ];

  const copyrightInfo = {
    date: "December 25, 2024",
    label: "Def Jam Recordings",
    copyright: "© 2024 RBMG / Def Jam Recordings, a division of UMG Recordings, Inc."
  };

  // Helper check bài đang hát
  const isCurrentSong = (songId: string | number) => currentSong && (currentSong._id == songId || currentSong.id == songId);

  const totalDuration = "45 min 20 sec"; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-white font-sans pb-10"
    >
      {/* --- HEADER SECTION --- */}
      <div className="px-6 pt-8 pb-8 bg-gradient-to-b from-gray-700/50 to-[#121212]">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-shrink-0"
          >
            <img 
              className="w-52 h-52 md:w-60 md:h-60 rounded shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-500" 
              src={albumData?.image} 
              alt={albumData?.name}
            />
          </motion.div>
          
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Album</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-lg mb-2 leading-tight">
              {albumData?.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 font-medium">
              <div className="flex items-center gap-1 group cursor-pointer">
                {/* Fallback image nếu không có spotify_logo */}
                <img className="w-6 h-6 rounded-full bg-white" src={assets.spotify_logo || albumData?.image} alt="Artist" />
                <span className="text-white hover:underline font-bold transition-colors">Artist Name</span>
              </div>
              <span className="text-white/60">•</span>
              <span>2024</span>
              <span className="text-white/60">•</span>
              <span className="text-white">{albumData?.songs?.length} songs,</span>
              <span className="text-gray-400 opacity-80">{totalDuration}</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex items-center gap-6">
          <button 
            // Logic Play: Nếu đang play thì pause, ngược lại play bài đầu tiên của album
            onClick={playStatus ? pause : () => playWithId(albumData?.songs[0]?.id)}
            className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all shadow-xl text-black"
          >
            {playStatus ? <Pause fill="black" size={24}/> : <Play fill="black" size={24} className="ml-1"/>}
          </button>
          <Heart size={32} className="text-gray-400 hover:text-white cursor-pointer transition" />
          <MoreHorizontal size={32} className="text-gray-400 hover:text-white cursor-pointer transition" />
        </div>
      </div>

      {/* --- TRACKLIST SECTION --- */}
      <div className="px-6">
        {/* Table Header - Sticky Header nếu muốn (thêm sticky top-[64px]) */}
        <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 px-4 py-3 text-sm font-medium text-gray-400 border-b border-white/10 mb-4 z-10">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="hidden md:block">Plays</span>
          <div className="flex justify-end pr-8">
            <Clock size={16} />
          </div>
        </div>

        {/* Song List */}
        <div className="flex flex-col gap-0.5">
          {albumData?.songs?.map((item: any, index: number) => {
            const isActive = isCurrentSong(item.id || item._id);
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => playWithId(item.id)}
                className={`grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] items-center gap-4 px-4 py-2.5 rounded-md cursor-pointer group transition-colors duration-200
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/10'}`}
              >
                {/* 1. Index / Play Icon */}
                <div className="flex items-center justify-center text-gray-400 text-base min-w-[16px]">
                  {isActive && playStatus ? (
                    <img src={musicPlaying} className="w-3.5 h-3.5 invert opacity-70" alt="playing"/>
                  ) : hoveredIndex === index ? (
                    <Play size={14} fill="white" className="text-white" />
                  ) : (
                    <span className={`font-variant-numeric ${isActive ? 'text-green-500' : ''}`}>{index + 1}</span>
                  )}
                </div>
                
                {/* 2. Title & Artist */}
                <div className="flex flex-col min-w-0 pr-4">
                  <span className={`font-medium text-base truncate ${isActive ? 'text-green-500' : 'text-white'}`}>
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate">
                    {albumData.artist_name || "Artist Name"}
                  </span>
                </div>

                {/* 3. Plays (Mocked) */}
                <div className="hidden md:block text-sm text-gray-400 font-variant-numeric">
                  {new Intl.NumberFormat('en-US').format(Math.floor(Math.random() * 10000000))}
                </div>

                {/* 4. Duration & Heart */}
                <div className="flex items-center justify-end gap-5 text-sm text-gray-400 font-variant-numeric pr-2">
                  <LikeButton targetId={item.id} targetType="song" size={15}/>
                  <span>{item.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- WIDGET 1: COPYRIGHT INFO --- */}
      <div className="px-6 mt-12 mb-12">
        <div className="text-[11px] text-gray-400 font-medium space-y-1">
          <p>{copyrightInfo.date}</p>
          <p>{copyrightInfo.copyright}</p>
          <p>{copyrightInfo.label}</p>
        </div>
      </div>

      {/* --- WIDGET 2: MORE BY ARTIST --- */}
      <div className="px-6 pb-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl md:text-2xl font-bold hover:underline cursor-pointer">More by Artist Name</h2>
          <span className="text-xs font-bold text-gray-400 hover:text-white cursor-pointer uppercase tracking-widest">See Discography</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moreAlbums.map((album) => (
            <div key={album.id} className="group p-4 bg-[#181818] hover:bg-[#282828] rounded-lg transition-all duration-300 cursor-pointer">
              <div className="relative mb-4 w-full aspect-square shadow-lg overflow-hidden rounded-md">
                <img src={album.image} alt={album.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-xl text-black hover:scale-105">
                    <Play fill="black" size={20} />
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-white truncate text-base">{album.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{album.year} • Album</p>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default DisplayAlbum;