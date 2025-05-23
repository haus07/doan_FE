import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { albumsData, songsData, artist } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import Artist from "./Artist";
import { motion } from "framer-motion";

const DisplayHome = () => {
  const [randomSongs, setRandomSongs] = useState([]);

  useEffect(() => {
    const shuffled = [...songsData].sort(() => Math.random() - 0.5);
    setRandomSongs(shuffled.slice(0, 10));
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white"
    >
      <Navbar />

      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Popular Artists</h1>
        <div className="flex overflow-x-auto gap-4">
          {artist.map((item) => (
            <Artist
              key={item.id}
              img={item.img}
              name={item.name}
              role={item.role}
              albumID={item.albumId}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Feature Charts</h1>
        <div className="flex overflow-x-auto gap-4">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Today's Biggest Hits</h1>
        <div className="flex overflow-x-auto gap-4">
          {randomSongs.map((item, index) => (
            <SongItem
              key={item.id || index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold">Made For You</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-1">Discover Weekly</h3>
            <p className="text-sm text-purple-100 opacity-90">
              Your weekly mixtape of fresh music
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-1">Release Radar</h3>
            <p className="text-sm text-green-100 opacity-90">
              New releases from your favorite artists
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-1">Daily Mix</h3>
            <p className="text-sm text-blue-100 opacity-90">
              Perfect blend of your favorites
            </p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DisplayHome;
