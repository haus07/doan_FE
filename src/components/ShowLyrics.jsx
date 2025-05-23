import React from "react";
import { lyrics } from "../assets/lyrics";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const ShowLyrics = () => {
  const { id } = useParams();
  const song = lyrics.find((item) => item.id === parseInt(id));

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-white"
    >
      <Navbar />
      <div className="p-6">
        <h2 className=" text-2xl font-bold mb-6">Lyrics</h2>
        <pre className="whitespace-pre-wrap text-xl leading-loose font-sans text-white">
          {song?.content || "No lyrics found."}
        </pre>
      </div>
    </motion.div>
  );
};

export default ShowLyrics;
