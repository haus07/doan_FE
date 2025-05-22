import React from "react";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { motion } from "framer-motion";


const SearchContent = ({searchQuerry}) => {
   const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05, 
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

return (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="flex flex-col gap-y-2 w-full px-6 py-4 bg-neutral-900"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {songsData.map(
        (itemData, index) =>
          itemData.name.toLowerCase().startsWith(searchQuerry) && (
            <motion.div variants={item} key={itemData.id || index}>
              <SongItem
                name={itemData.name}
                desc={itemData.desc}
                id={itemData.id}
                image={itemData.image}
              />
            </motion.div>
          )
      )}
    </div>
  </motion.div>
);

}

export default SearchContent