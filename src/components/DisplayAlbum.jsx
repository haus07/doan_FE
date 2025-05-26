import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { songsData } from "./../assets/assets";
import playsIcon from "../assets/play.png";
import musicPlaying from "../assets/hinh/musicplaying.gif";
import { motion } from "framer-motion";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const {
    playWithId,
    currentSong,
    pause,
    playWithAlbumId,
    currentAlbumId,
    playStatus,
  } = useContext(PlayerContext);
  const [songPlaying, setSongPlaying] = useState(null);
  const songAlbum = songsData.filter(
    (song) => Number(song.album_id) === Number(id)
  );

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isCurrentSong = (songId) => {
    return currentSong?.id === songId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b to-black text-white"
    >
      <Navbar />

      <div className="px-6 pt-8 pb-6">
        <div className="flex gap-8 flex-col md:flex-row md:items-end">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <img
              className="w-56 h-56 rounded-lg shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
              src={albumData.image}
              alt={albumData.name}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Playlist
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {albumData.name}
            </h1>
            <p className="text-lg text-gray-300 mb-4 max-w-2xl leading-relaxed">
              {albumData.desc}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <img
                className="w-6 h-6"
                src={assets.spotify_logo}
                alt="Spotify"
              />
              <span className="font-semibold text-white">Spotify</span>
              <span>•</span>
              <span>1,000 likes</span>
              <span>•</span>
              <span className="font-semibold">{songAlbum.length} songs</span>
            </div>
          </motion.div>
        </div>
        {playStatus ? (
          <PauseButton
            onClick={() => pause()}
            className="bg-green-500 hover:bg-green-400 text-black font-bold p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center w-14 h-14 mt-5"
          />
        ) : (
          <PlayButton
            onClick={() => playWithId(songAlbum[0].id)}
            className="bg-green-500 hover:bg-green-400 text-black font-bold p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center w-14 h-14 mt-5"
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        ></motion.div>
      </div>

      <div className="px-6 pb-8">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-sm font-medium text-gray-400 border-b border-gray-700 mb-2">
          <div className="flex items-center gap-4">
            <span className="w-4 text-center">#</span>
            <span>Title</span>
          </div>
          <span>Album</span>
          <span className="hidden md:block">Date Added</span>
          <div className="flex justify-end">
            <img className="w-4 h-4" src={assets.clock_icon} alt="duration" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-1"
        >
          {songAlbum.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => {
                playWithId(item.id), setSongPlaying(item.id);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`grid grid-cols-4 gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isCurrentSong(item.id)
                  ? "bg-green-500 bg-opacity-20 text-green-400"
                  : "hover:bg-white hover:bg-opacity-10 text-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-4 text-center">
                  {hoveredIndex === index ? (
                    <img
                      src={playsIcon}
                      alt="play"
                      className="w-4 h-4 mx-auto"
                    />
                  ) : item.id === songPlaying ? (
                    <img src={musicPlaying} className="w-4 h-4 mx-auto" />
                  ) : (
                    <span className="text-gray-400 text-sm">{index + 1}</span>
                  )}
                </div>

                <img
                  className="w-10 h-10 rounded object-cover shadow-md"
                  src={item.image}
                  alt={item.name}
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-medium truncate ${
                      isCurrentSong(item.id) ? "text-green-400" : "text-white"
                    }`}
                  >
                    {item.name}
                  </p>
                  {item.artist && (
                    <p className="text-sm text-gray-400 truncate">
                      {item.artist}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-400 truncate">
                  {albumData.name}
                </span>
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
      </div>
    </motion.div>
  );
};

export default DisplayAlbum;
