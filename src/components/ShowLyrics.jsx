import React from "react";
import { lyrics } from "../assets/lyrics";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {motion } from "framer-motion"

const ShowLyrics = () => {
    const { id } = useParams()
    const songLyrics = lyrics.find(item =>item.id ===parseInt(id))
    

    return (

        <>
             <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      
            <Navbar/>
        <div className="text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Lyrics</h2>
       <pre className="whitespace-pre-wrap text-4xl leading-relaxed font-sans text-white">
  {songLyrics.content}
</pre>
                </div>
    </motion.div>
            </>
    )
}

export default ShowLyrics