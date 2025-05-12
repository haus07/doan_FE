import React from "react";
import Navbar from './Navbar'
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { songsData } from "../assets/assets";
import { useEffect,useState } from "react";

const DisplayHome = () => {
     const [randomSongs, setRandomSongs] = useState([]);

  useEffect(() => {
    // Shuffle mảng
    const shuffled = [...songsData].sort(() => Math.random() - 0.5);
    // Lấy 10 bài đầu tiên
    setRandomSongs(shuffled.slice(0, 10));
  }, [songsData]);
    return (
        <>
            <Navbar /> 
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
        </>
    )
}

export default DisplayHome