import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { podcasts } from "../components/PodcastList";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState({ ...songsData[0], type: "song" });
  const [playStatus, setPlayStatus] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(songsData[0].id);
  const [currentType, setCurrentType] = useState("song");
  const [currentAlbumId, setCurrentAlbumId] = useState(null);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });
  const [volume, setVolume] = useState(1);

  const getDataByType = (type) => {
    return type === "podcast" ? podcasts : songsData;
  };

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

  const playWithId = async (id, type = "song") => {
    const data = getDataByType(type);
    const item = data.find((el) => el.id === id);
    if (item) {
      setTrack({ ...item, type });
      setCurrentTrackId(id);
      setCurrentType(type);

      if (audioRef.current) {
        // Nếu track đã thay đổi, set src mới và play
        if (audioRef.current.src !== item.file) {
          audioRef.current.src = item.file;
          try {
            await audioRef.current.play();
            setPlayStatus(true);
          } catch (error) {
            console.log("Play error:", error);
          }
        } else {
          // Nếu src đã là file hiện tại, chỉ cần play nếu đang pause
          if (audioRef.current.paused) {
            try {
              await audioRef.current.play();
              setPlayStatus(true);
            } catch (error) {
              console.log("Play error:", error);
            }
          }
        }
      }
    }
  };

  const previous = async () => {
    const data = getDataByType(currentType);
    const index = data.findIndex((el) => el.id === currentTrackId);
    if (index > 0) {
      await playWithId(data[index - 1].id, currentType);
    }
  };

  const next = async () => {
    const data = getDataByType(currentType);
    const index = data.findIndex((el) => el.id === currentTrackId);
    if (index !== -1 && index < data.length - 1) {
      await playWithId(data[index + 1].id, currentType);
    }
  };

  const playWithAlbumId = async (albumId) => {
    const songs = songsData.filter((song) => song.album_id === albumId);
    if (songs.length > 0) {
      setTrack({ ...songs[0], type: "song" });
      setCurrentAlbumId(albumId);
      setCurrentTrackId(songs[0].id);
      setCurrentType("song");
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
    if (id !== currentTrackId || currentType !== "song") {
      playWithId(id, "song");
    } else {
      play();
    }
  };

  const playPodcast = (id) => {
    if (id !== currentTrackId || currentType !== "podcast") {
      playWithId(id, "podcast");
    } else {
      play();
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;

    const offsetX = e.nativeEvent.offsetX;
    const width = seekBg.current.offsetWidth;
    const duration = audioRef.current.duration;

    if (!isFinite(offsetX) || !width || !duration) return;

    const seekTime = (offsetX / width) * duration;

    if (isFinite(seekTime)) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Update time + seek bar
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
  }, []);

  // Auto update src + play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (track && track.file) {
      if (audioRef.current.src !== track.file) {
        audioRef.current.src = track.file;
      }
      if (playStatus) {
        audioRef.current.play().catch((err) => console.log("Play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [track, playStatus]);

  // Auto next if song (not podcast)
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      if (currentType === "song") {
        next();
      } else {
        setPlayStatus(false);
      }
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current)
        audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [currentType, currentTrackId]);

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
    playAlbum: playWithAlbumId,
    playSong,
    playPodcast,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
