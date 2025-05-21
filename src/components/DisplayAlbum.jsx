import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { albumsData, assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { songsData } from './../assets/assets';
import playIcon from "../assets/playbutton.png"; // 

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const { playWithId } = useContext(PlayerContext);
    const songAlbum = songsData.filter(song => Number(song.album_id) === Number(id));

    const [hoveredIndex, setHoveredIndex] = useState(null); 

    return (
        <>
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
                        &#x2022;1,321,154 likes
                        &#x2022;<b> 50 songs,</b>
                        about 2 hr 30
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
                        onClick={() => playWithId(item.id)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                    >
                        <p className="text-white flex items-center gap-4">
                            {
                                hoveredIndex === index ? (
                                    <img src={playIcon} alt="play" className="w-7"/> 
                                ) : (
                                    <b className="text-[#a7a7a7]">{index + 1}</b>
                                )
                            }
                            <img className="inline w-10" src={item.image} alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] hidden sm:block">5 days ago</p>
                        <p className="text-[15px] text-center">{item.duration}</p>
                    </div>
                ))
            }
        </>
    )
}

export default DisplayAlbum;
