import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [currentAlbumId, setCurrentAlbumId] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(0);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    setCurrentTrackId(id);
    const song = songsData[id];
    if (song) {
      setTrack(song);
      if (audioRef.current) {
        audioRef.current.src = song.file;
        try {
          await audioRef.current.play();
          setPlayStatus(true);
        } catch (error) {
          console.log("Play error:", error);
        }
      }
    }
  };

  const playWithAlbumId = async (albumId) => {
    setCurrentAlbumId(albumId);
    const songs = songsData.filter((song) => song.album_id === albumId);
    if (songs.length > 0) {
      setTrack(songs[0]);
      if (audioRef.current) {
        audioRef.current.src = songs[0].file;
        try {
          await audioRef.current.play();
          setPlayStatus(true);
        } catch (error) {
          console.log("Play error:", error);
        }
      }
    }
  };

  const playSong = (id) => {
    if (id !== currentTrackId) {
      playWithId(id);
    } else if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const playAlbum = (id) => {
    if (id !== currentAlbumId) {
      playWithAlbumId(id);
    } else if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      await playWithId(track.id - 1);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await playWithId(track.id + 1);
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const seekTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Cập nhật thanh seek và thời gian
  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (!audioRef.current.duration) return;

      if (seekBar.current) {
        seekBar.current.style.width =
          (audioRef.current.currentTime / audioRef.current.duration) * 100 +
          "%";
      }

      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audioRef.current)
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, seekBar]);

  // Cập nhật src và trạng thái phát khi track hoặc playStatus thay đổi
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = track.file;

    if (playStatus) {
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [track, playStatus]);

  // Tự động next bài khi hết bài hiện tại
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      const currentIndex = songsData.findIndex(
        (song) => Number(song.id) === Number(track.id)
      );
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

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current)
        audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [track]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    setVolume,
    volume,
    handleVolumeChange,
    currentTrackId,
    setCurrentTrackId,
    currentAlbumId,
    playWithAlbumId,
    playAlbum,
    playSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
