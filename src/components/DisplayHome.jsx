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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const madeForYouItems = [
    {
      title: "Discover Weekly",
      desc: "Your weekly mixtape of fresh music",
      from: "from-purple-600",
      to: "to-purple-800",
    },
    {
      title: "Release Radar",
      desc: "New releases from your favorite artists",
      from: "from-green-600",
      to: "to-green-800",
    },
    {
      title: "Daily Mix",
      desc: "Perfect blend of your favorites",
      from: "from-blue-600",
      to: "to-blue-800",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white space-y-12"
    >
      <Navbar />

      <section>
        <h1 className="text-2xl font-bold mb-4">Popular Artists</h1>
        <div className="flex overflow-x-auto gap-5">
          {
            artist.map((item) => (
            <Artist
                                id={item.id}
                                img={item.img}
                                name={item.name}
                                role={item.role}
                albumID={item.albumId}
                key={item.id}
                                />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">Feature Charts</h1>
        <div className="flex overflow-x-auto gap-5">
          {albumsData.map((item, index) => (
            <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">Today's Biggest Hits</h1>
        <div className="flex overflow-x-auto gap-5">
          {randomSongs.map((item, index) => (
            <SongItem key={item.id || index}
                        name={item.name}
                        desc={item.desc}
                        id={item.id}
                        image={item.image}/>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {madeForYouItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${item.from} ${item.to} p-6 rounded-2xl hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-white opacity-80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DisplayHome;
