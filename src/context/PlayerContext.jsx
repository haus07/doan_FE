
import { createContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { songsData } from "../assets/assets";
import { albumsData } from "../assets/assets";
export const PlayerContext = createContext();


 const PlayerContextProvider = (probs) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
     
    const [track, setTrack] = useState(songsData[0]);
     const [playStatus, setPlayStatus] = useState(false);
     const [currentAlbumId, setCurrentAlbumId] = useState(false);
     const [currentTrackId, setCurrentTrackId] = useState(0);
    const [time,setTime] = useState({
        currentTime: {
            second: 0,
            minute:0
            },
        totalTime: {
            second: 0,
            minute:0
        }
    })
     
     const play = () => {
        audioRef.current.play();
  setPlayStatus(true);
    }
     
   const playSong = (id) => {
  if (id !== currentTrackId) {
    setCurrentTrackId(id);
    audioRef.current.src = playWithId(id);
  }
  audioRef.current.play();
  setPlayStatus(true);
     }

     const playAlbum = (id) => {
  if (id !== currentAlbumId) {
    setCurrentAlbumId(id);
    audioRef.current.src = playWithAlbumId(id);
  }
  audioRef.current.play();
  setPlayStatus(true);
     }
     



    const pause = () => {
  audioRef.current.pause();
  setPlayStatus(false);
}
     
     const playWithAlbumId = async (albumId) => {
        const songs = songsData.filter(song => song.album_id === albumId)
         await setTrack(songs[0]);
         await audioRef.current.play();
         setPlayStatus(true);
    } 
     
     const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
     
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime%60),
                        minute: Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration%60),
                        minute: Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        })
    })
    
    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    } 
    const next = async () => {
        if (track.id < songsData.length-1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }    
    }
    
    const seekSong = async (e) => {
         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }
     
    const [volume, setVolume] = useState(1);

    const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
        audioRef.current.volume = newVolume;
    }
    };
    
useEffect(() => {
  if (!audioRef.current) return;

  audioRef.current.src = track.file;

  if (playStatus) {
    audioRef.current.play().catch(err => console.log("Play error:", err));
  } else {
    audioRef.current.pause();
  }
}, [track, playStatus]);

const autoNext = async () => {
  const currentIndex = songsData.findIndex(song => Number(song.id) === Number(track.id));
  if (currentIndex !== -1) {
    if (currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex + 1];
      setTrack(nextTrack);
      setCurrentTrackId(nextTrack.id);
      setPlayStatus(true);
    } else {
      setPlayStatus(false);
    }
  }
};
useEffect(() => {
  if (!audioRef.current) return;

  const handleEnded = () => {
    autoNext();
  };

  audioRef.current.addEventListener("ended", handleEnded);

  return () => {
    audioRef.current.removeEventListener("ended", handleEnded);
  };
}, [track]);

    
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause, playWithId,
        previous, next, seekSong,
        setVolume, volume,
        handleVolumeChange, currentTrackId,setCurrentTrackId,
        currentAlbumId, playWithAlbumId,
        playAlbum,playSong
    }
     
    
    return (
        <PlayerContext.Provider value={contextValue}>
            { probs.children }
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
