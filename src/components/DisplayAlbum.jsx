import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { songsData } from './../assets/assets';
import playsIcon from "../assets/play.png";
import musicPlaying from "../assets/hinh/musicplaying.gif"
import { motion } from "framer-motion";
import { space } from "postcss/lib/list";
import { span } from "framer-motion/client";

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const { playWithId} = useContext(PlayerContext);
    const songAlbum = songsData.filter(song => Number(song.album_id) === Number(id));

    const [hoveredIndex, setHoveredIndex] = useState(null); 
    const [songPlaying, setSongPlaying] = useState(null);

    return (
        <>
             <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5 font-bold mb-4 md:text-7"></h2>
                    <h4>{albumData.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5 mr-2" src={assets.spotify_logo} alt="" />
                        <b>Spotify</b>
                        &#x2022;1000 likes
                        &#x2022;<b> 10 songs</b>
                        
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p className="mr-4">#<b>Title</b></p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />

            {
                
                songAlbum.map((item, index) => (
                    
                    <div
                    key={index}
                    onClick={() => {
                        playWithId(item.id);
                        setSongPlaying(item.id)
                    }
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                >
                        <p className="text-white flex items-center gap-4 ">
                             
                            {
                                hoveredIndex === index ? (
                                    
                                    <img src={playsIcon} alt="play" className="w-5 h-5"/> 
                                ) : item.id === songPlaying ? <img src={musicPlaying} className="w-10 h-10 relative -translate-x-8" /> :
                                (<b className="text-[#a7a7a7]">{index + 1}</b>)
                                
                            }

                            { item.id === songPlaying ? 

( <img className="inline w-10 relative -translate-x-8 " src={item.image} alt="" />):( <img className="inline w-10 " src={item.image} alt="" />)
                            }
                            {item.id === songPlaying?
                                <span className="-translate-x-8">{item.name}</span> :
                                <span>{item.name }</span>
                            }               
                        </p>
                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] hidden sm:block">5 days ago</p>
                        <p className="text-[15px] text-center">{item.duration}</p>
                    </div>
                ))
            }
            </motion.div>
        </>
    )
}

export default DisplayAlbum;
