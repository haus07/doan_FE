import React from "react";
import { albumsData, songsData, artist } from "../assets/assets";
import { motion } from "framer-motion";
import { Play, Shuffle, UserPlus, MoreHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import playsIcon from "../assets/play.png";
import musicPlaying from "../assets/hinh/musicplaying.gif";

const DisplayArtist = () => {
  const { id } = useParams();
  const artistDetail = artist[Number(id)];
  const songAlbum = songsData.filter(song => Number(song.album_id) === Number(id));
  const { playWithId, currentSong } = useContext(PlayerContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const albumData = albumsData[id];
  const [songPlaying, setSongPlaying] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const isCurrentSong = (songId) => {
    return currentSong?.id === songId;
    };
    const description = `
${artistDetail.name} is a US/UK pop singer known for their dreamy melodies and nostalgic lyrics. 
  Formed in the world, the singer has captured hearts across world with their unique blend 
  of  pop and contemporary world music. Their songs often explore themes of love, 
  youth, and the passage of time, resonating deeply with young world audiences.`
    const description2= ` With hits like ${songAlbum[0]} and ${songAlbum[7]}, Chillies has established themselves as one of 
                the leading voices in world music scene. Their music videos are known for their 
                cinematic quality and emotional storytelling, often featuring beautiful world landscapes 
                and urban settings.`

  return (
    <motion.div
      className="bg-gradient-to-b min-h-screen lg:-m-10 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="h-[500px] bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(${artistDetail.imgDetail})`
          }}
        >
          <div className="absolute bottom-8 left-8">
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium"> Artist</span>
            </motion.div>
            <motion.h1
              className="text-8xl font-black mb-6 tracking-tight"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {artistDetail.name}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              12,796,163 monthly listeners
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-6">
          <motion.button
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all duration-200 shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
          </motion.button>

          <motion.div className="w-12 h-12 rounded overflow-hidden" whileHover={{ scale: 1.05 }}>
            <img src={artistDetail.imgDetail} alt="Album cover" className="w-full h-full object-cover" />
          </motion.div>

          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Shuffle className="w-6 h-6" />
          </button>

          <button className="px-6 py-2 border border-gray-600 rounded-full text-sm font-medium hover:border-white hover:scale-105 transition-all duration-200">
            Follow
          </button>

          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <motion.div className="space-y-1">
          {(showAll ? songAlbum : songAlbum.slice(0, visibleCount)).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => {
                playWithId(item.id);
                setSongPlaying(item.id);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`grid grid-cols-4 gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isCurrentSong(item.id)
                  ? 'bg-green-500 bg-opacity-20 text-green-400'
                  : 'hover:bg-white hover:bg-opacity-10 text-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-4 text-center">
                  {hoveredIndex === index ? (
                    <img src={playsIcon} alt="play" className="w-4 h-4 mx-auto" />
                  ) : item.id === songPlaying ? (
                    <img src={musicPlaying} className="w-4 h-4 mx-auto" />
                  ) : (
                    <span className="text-gray-400 text-sm">{index + 1}</span>
                  )}
                </div>
                <img className="w-10 h-10 rounded object-cover shadow-md" src={item.image} alt={item.name} />
                <div className="min-w-0 flex-1">
                  <p className={`font-medium truncate ${isCurrentSong(item.id) ? 'text-green-400' : 'text-white'}`}>{item.name}</p>
                  {item.artist && <p className="text-sm text-gray-400 truncate">{item.artist}</p>}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 truncate">{albumData.name}</span>
              </div>
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-400">5 days ago</span>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-400">{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {songAlbum.length > visibleCount && (
          <div className="mt-4 text-left pl-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-gray-50 hover:underline"
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
          </div>
              )}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {songAlbum.slice(0, 5).map((item, index) => (
              
            <div key={index} className="group cursor-pointer">
              <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                <img 
                  src={item.image}
                  alt=""
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium text-sm mb-1 group-hover:underline">
                {item.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {artistDetail.name}
              </p>
            </div>
          ))}
        </div>
          </motion.div>
          <div className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">About</h2>
        
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-8 relative overflow-hidden">
          <div className="flex items-start gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={ artistDetail.imgDetail}
                alt="Artist"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <p className="text-2xl font-bold text-white mb-4">
                1,025,291 monthly listeners
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                              {description }
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                              { description2}
              </p>
            </div>
                  </div>
                  </div>
          </div>  
    </motion.div>
  );
};

export default DisplayArtist;