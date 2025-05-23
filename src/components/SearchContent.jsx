import React from "react";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { motion } from "framer-motion";

const SearchContent = ({ searchQuerry }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const filteredSongs = songsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuerry.toLowerCase())
  );

  return (
    <motion.div
      className="w-full px-6 py-6 min-h-screen "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold mb-6 ">
        Search Results
      </h2>

      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSongs.map((item, index) => (
            <motion.div key={item.id || index} variants={itemVariants}>
              <SongItem
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          No songs found for{" "}
          <span className="text-[#38bdf8] font-semibold">
            "{searchQuerry}"
          </span>
        </p>
      )}
    </motion.div>
  );
};

export default SearchContent;
