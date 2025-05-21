import React from "react";
import Navbar from './Navbar'
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { songsData ,artist} from "../assets/assets";
import { useEffect, useState } from "react";
import Artist from "./Artist";
import { motion } from 'framer-motion';

const DisplayHome = () => {
     const [randomSongs, setRandomSongs] = useState([]);

  useEffect(() => {
    const shuffled = [...songsData].sort(() => Math.random() - 0.5);
    setRandomSongs(shuffled.slice(0, 10));
  }, [songsData]);
    return (
        <>
            <motion.div
            initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}>
            <Navbar /> 
            <div className="mb-4">
                
                    <h1 className="my-5 font-bold text-2x">Popular Artists</h1>
                
                <div className="flex overflow-auto">
                    {artist.map((item)=>{
                        return (
                            <Artist img={item.img}
                                name={item.name}
                                role={item.role}
                                albumID={item.albumId}
                                key={ item.id} />
                                
                        )
                    }) }
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2x">Feature Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />)) }
                </div>
            </div>
             <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
                <div className="flex overflow-auto">
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
                </div>
                </motion.div>
        </>
    )
}

export default DisplayHome