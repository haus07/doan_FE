import React from "react";
import { songsData } from "../../assets/assets";
import SongItem from "../cards/SongItem";
import { motion, AnimatePresence } from "framer-motion";
import { Frown } from "lucide-react";

const SearchContent = ({ searchQuery }) => {
  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Logic lọc bài hát
  // Nếu searchQuery rỗng => Hiển thị tất cả (hoặc có thể để rỗng tùy ý bro)
  // Ở đây tui để hiển thị tất cả để nhìn cho đỡ trống trải lúc đầu
  const filteredSongs = songsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-[50vh]">
      
      {/* Tiêu đề thay đổi dựa theo trạng thái */}
      <h2 className="text-xl font-bold mb-6 text-white">
        {searchQuery ? `Results for "${searchQuery}"` : "Browse All"}
      </h2>

      <AnimatePresence mode="wait">
        {filteredSongs.length > 0 ? (
          <motion.div
            key="content" // Key quan trọng để Framer biết nội dung thay đổi
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>
        ) : (
          /* TRƯỜNG HỢP KHÔNG TÌM THẤY */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center mt-20 text-center"
          >
            <Frown className="w-16 h-16 text-zinc-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No results found
            </h3>
            <p className="text-zinc-400">
              Please make sure your words are spelled correctly, or use less or different keywords.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchContent;