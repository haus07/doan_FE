import React, { useContext, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shuffle, Check, MoreHorizontal, Clock, Play, Pause } from "lucide-react";

// Context & Assets
import { PlayerContext } from "../../context/PlayerContext";
import { songsData, artist } from "../../assets/assets";

// Components
import SongItem from "../cards/SongItem";
import musicPlaying from "../../assets/hinh/musicplaying.gif";

// 1. Định nghĩa Interface (Nếu bro chưa có file types riêng)
interface Song {
  id: number | string;
  name: string;
  image: string;
  desc?: string;
  duration: string;
  album_id?: number | string;
}

const DisplaySong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playWithId, currentSong, playStatus, pause } = useContext(PlayerContext);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | string | null>(null);

  // 2. Chuyển đổi ID an toàn
  const songId = Number(id);
  const song = songsData[songId];

  // 3. Tối ưu logic lấy Artist và Album ID (Thay thế chuỗi if-else dài)
  const { artistDetail, albumId } = useMemo(() => {
    let artIndex = 0;
    let albId = 0;

    if (songId >= 0 && songId <= 9) { artIndex = 0; albId = 0; }
    else if (songId >= 10 && songId <= 19) { artIndex = 3; albId = 3; }
    else if (songId >= 20 && songId <= 29) { artIndex = 4; albId = 4; }
    else if (songId >= 30 && songId <= 39) { artIndex = 2; albId = 2; }
    else if (songId >= 40 && songId <= 49) { artIndex = 1; albId = 1; }

    return { 
      artistDetail: artist[artIndex], 
      albumId: albId 
    };
  }, [songId]);

  // 4. Lấy danh sách bài hát cùng Album
  const relatedSongs = useMemo(() => {
    return songsData.filter((item: any) => Number(item.album_id) === Number(albumId));
  }, [albumId]);

  // Handle trường hợp ID không tồn tại
  if (!song) return <div className="text-white p-10">Song not found</div>;

  const isCurrentSong = currentSong?.id === song.id;

  return (
    <div className="text-white p-6 pb-24"> {/* Thêm padding bottom để tránh Player che */}
      
      {/* --- HEADER SECTION --- */}
      <motion.div
        className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-8 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-52 h-52 md:w-60 md:h-60 shadow-2xl rounded-md overflow-hidden flex-shrink-0"
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src={song.image} 
            alt={song.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-2 text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-bold uppercase tracking-wider text-gray-200">Single</span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight">{song.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium mt-2 text-gray-300">
            <div 
                className="flex items-center gap-2 hover:text-white cursor-pointer transition"
                onClick={() => navigate(`/artist/${artistDetail.id}`)}
            >
                {/* Giả sử artist có ảnh, nếu không có thì bỏ img */}
                <span className="font-bold text-white hover:underline">{artistDetail.name}</span>
            </div>
            <span>•</span>
            <span>2025</span>
            <span>•</span>
            <span>{song.duration}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex items-center gap-6 mb-10">
        <button 
          onClick={() => isCurrentSong && playStatus ? pause() : playWithId(song.id)}
          className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all shadow-xl text-black"
        >
          {isCurrentSong && playStatus ? <Pause fill="black" size={24}/> : <Play fill="black" size={24} className="ml-1"/>}
        </button>

        <button className="text-gray-400 hover:text-white transition transform hover:scale-105">
          <Shuffle size={28} />
        </button>

        <button className="px-6 py-1.5 border border-gray-500 rounded-full text-sm font-bold uppercase hover:border-white hover:scale-105 transition tracking-widest">
            Follow
        </button>

        <button className="text-gray-400 hover:text-white transition transform hover:scale-105">
          <MoreHorizontal size={28} />
        </button>
      </div>

      {/* --- SONG ROW (CURRENT) --- */}
      <div className="mb-8">
          {/* Header Table */}
          <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-white/10 mb-2">
            <div>#</div>
            <div>Title</div>
            <div className="hidden md:block text-center">Plays</div>
            <div className="flex justify-end pr-4"><Clock size={16} /></div>
          </div>

          {/* Song Row */}
          <div
            onClick={() => playWithId(song.id)}
            onMouseEnter={() => setHoveredIndex(song.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] items-center gap-4 px-4 py-3 hover:bg-white/10 rounded-md transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-center min-w-[16px]">
                {isCurrentSong && playStatus ? (
                    <img src={musicPlaying} alt="playing" className="w-3.5 h-3.5 invert opacity-70" />
                ) : hoveredIndex === song.id ? (
                    <Play size={14} fill="white" className="text-white" />
                ) : (
                    <span className={`text-sm ${isCurrentSong ? 'text-green-500' : 'text-gray-400'}`}>1</span>
                )}
            </div>

            <div className="flex flex-col min-w-0">
                <span className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>{song.name}</span>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{artistDetail.name}</span>
            </div>

            <div className="hidden md:block text-center text-sm text-gray-400">
                7,777,777
            </div>

            <div className="flex items-center justify-end gap-4 pr-2">
                 {/* Fake Check icon for Saved status */}
                 <Check size={16} className="text-green-500 hidden group-hover:block" />
                 <span className="text-sm text-gray-400 font-variant-numeric">{song.duration}</span>
            </div>
          </div>
      </div>

      {/* --- COPYRIGHT --- */}
      <div className="mt-8 mb-10 pt-4">
        <p className="text-sm text-gray-400 mb-1">June 1, 2025</p>
        <p className="text-[11px] text-gray-500">© 2025 {artistDetail.name}</p>
        <p className="text-[11px] text-gray-500">℗ 2025 {artistDetail.name}</p>
      </div>

      {/* --- MORE BY ARTIST --- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold hover:underline cursor-pointer">More by {artistDetail.name}</h2>
        <span className="text-xs font-bold text-gray-400 hover:text-white cursor-pointer uppercase tracking-widest">See Discography</span>
      </div>

      <motion.div 
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {relatedSongs.map((item: any, index: number) => (
            <div key={item.id || index} className="min-w-[180px]">
                <SongItem
                    name={item.name}
                    desc={item.desc}
                    id={item.id}
                    image={item.image}
                />
            </div>
        ))}
      </motion.div>

    </div>
  );
};

export default DisplaySong;