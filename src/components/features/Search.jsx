import React from "react";
import Navbar from "../layouts/Navbar";
import SearchInput from "./SearchInput";
import { motion } from "framer-motion";

const Search = () => {
  return (
    <motion.div
      className="w-full h-full pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="flex flex-col gap-6 mt-8 px-4">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Search
        </h1>
        {/* Component Input chứa luôn cả phần hiển thị kết quả */}
        <SearchInput />
      </div>
    </motion.div>
  );
};

export default Search;