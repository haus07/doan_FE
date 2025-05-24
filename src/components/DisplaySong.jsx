import React from "react";
import { Play, Shuffle, Check, Download, MoreHorizontal, List, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { albumsData, assets, songsData, artist } from "../assets/assets";
import SongItem from "./SongItem";
import PlayButton from "./PlayButton"
import PauseButton from "./PauseButton";



const DisplaySong = () => {
    const { id } = useParams();
    const song = songsData[id];  
    let artistDetail;
    if (id>=0 &&id <= 9) {
        artistDetail = artist[0]
    } else if (id>=10 &&id <= 19) {
        artistDetail = artist[3]
    } else if (id>=20 &&id <= 29) {
        artistDetail = artist[4]
    } else if (id>=30 &&id <= 39) {
        artistDetail = artist[2]
    }else if (id>=40 &&id <= 49) {
        artistDetail = artist[1]
    }
    let albumId;
    if (id>=0 &&id <= 9) {
        albumId=0
    } else if (id>=10 &&id <= 19) {
        albumId=3
    } else if (id>=20 &&id <= 29) {
        albumId=4
    } else if (id>=30 &&id <= 39) {
        albumId=2
    }else if (id>=40 &&id <= 49) {
        albumId=1
    }
    const songAlbum = songsData.filter(song => Number(song.album_id) === Number(albumId));
    const { playWithId, currentSong, pause, playWithAlbumId, currentAlbumId, playStatus } = useContext(PlayerContext); 
    const navigate = useNavigate()
    
    
  return (
    <div className=" text-white lg:-m-10 p-6">
     <motion.div
  className="flex items-start gap-6 mb-8 mt-10 ml-3"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <motion.div
    className="w-64 h-64 bg-black rounded-lg overflow-hidden flex-shrink-0"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <img 
      src={song.image} 
      alt="Album cover"
      className="w-full h-full object-cover opacity-80"
    />
  </motion.div>

  <motion.div
    className="flex-1 pt-4"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    <p className="text-sm text-gray-400 mb-2">Single</p>
    <h1 className="text-5xl font-bold mb-4 tracking-tight">{song.name}</h1>
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <span className="hover:underline cursor-pointer" onClick={() => navigate(`/artist/${artistDetail.id}`)}>{artistDetail.name}</span>
      <span>•</span>
      <span>2025</span>
      <span>•</span>
      <span>{song.duration}</span>
    </div>
  </motion.div>
</motion.div>


      <motion.div
        className="px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-6">
                {playStatus ?
        <PauseButton 
          onClick={()=>
          
          pause()
          }
          className="bg-green-500 hover:bg-green-400 text-black font-bold p-4 rounded-full  shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center w-14 h-14 mt-1"
          
        />
      :
        <PlayButton onClick={()=>
          playWithId(id)
          } className="bg-green-500 hover:bg-green-400 text-black font-bold p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center w-14 h-14 mt-1" />
                    
      }

          <motion.div className="w-12 h-12 rounded overflow-hidden" whileHover={{ scale: 1.05 }}>
                      <img src={ song.image} alt="Album cover" className="w-full h-full object-cover" />
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
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-2">
        <div className="col-span-1">#</div>
        <div className="col-span-7">Title</div>
        <div className="col-span-3 text-center">Plays</div>
        <div className="col-span-1 flex justify-end">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors group">
        <div className="col-span-1 flex items-center">
          <span className="text-gray-400 group-hover:hidden">1</span>
          <Play className="w-4 h-4 text-white hidden group-hover:block" />
        </div>
        
        <div className="col-span-7 flex flex-col">
                  <span className="text-white font-medium">{ song.name}</span>
                  <span className="text-sm text-gray-400">{ artistDetail.name}</span>
        </div>
        
        <div className="col-span-3 flex items-center justify-center">
          <span className="text-gray-300">7,777,777</span>
        </div>
        
        <div className="col-span-1 flex items-center justify-end">
          <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-400">{song.duration }</span>
        </div>
      </div>

      <div className="mt-8 ml-3 pt-8 border-t border-gray-800">
        <p className="text-sm text-gray-400 mb-1">June 1, 2025</p>
              <p className="text-xs text-gray-500">© 2025 {artistDetail.name }</p>
        <p className="text-xs text-gray-500">℗ 2025 {artistDetail.name}</p>
      </div>

      <div className="mt-12 ml-3 flex items-center justify-between">
              <h2 className="text-2xl font-bold">More by {artistDetail.name }</h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          See discography
        </button>
          </div>
       <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.6 }}
>
  <div className="flex overflow-x-auto gap-5 mt-3">
    {songAlbum.map((item, index) => (
      <motion.div
        key={item.id || index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 * index }}
      >
        <SongItem
          name={item.name}
          desc={item.desc}
          id={item.id}
          image={item.image}
        />
      </motion.div>
    ))}
  </div>
</motion.section>

    </div>
  );
};

export default DisplaySong;