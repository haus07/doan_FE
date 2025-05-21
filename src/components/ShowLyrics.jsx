import React from "react";
import { lyrics } from "../assets/lyrics";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ShowLyrics = () => {
    const { id } = useParams()
    const songLyrics = lyrics.find(item =>item.id ===parseInt(id))
    

    return (
        <>
            <Navbar/>
        <div className="text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Lyrics</h2>
       <pre className="whitespace-pre-wrap text-4xl leading-relaxed font-sans text-white">
  {songLyrics.content}
</pre>
        </div></>
    )
}

export default ShowLyrics