import { createContext, useEffect, useRef, useState } from "react";
import { songsData as defaultSongs } from "../assets/assets"; 

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [songsData, setSongsData] = useState(null);
    const [track, setTrack] = useState(defaultSongs[0]);
    const [playStatus, setPlayStatus] = useState(false);
    
    // State thời gian
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        // Lưu ý: Đảm bảo songsData đã có dữ liệu trước khi find
        const song = songsData ? songsData.find((item) => item.id === id) : defaultSongs.find((item) => item.id === id);
        if (song) {
            await setTrack(song);
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        if (!songsData) return;
        const currentIndex = songsData.findIndex(item => item.id === track.id);
        if (currentIndex > 0) {
            await setTrack(songsData[currentIndex - 1]);
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if (!songsData) return;
        const currentIndex = songsData.findIndex(item => item.id === track.id);
        if (currentIndex < songsData.length - 1) {
            await setTrack(songsData[currentIndex + 1]);
            setPlayStatus(true);
        }
    }

    const seekSong = async (e) => {
        // Chỉ seek khi đã có duration
        if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }

    // --- LOGIC TIME UPDATE ĐÃ REFAC ---
    
    // Hàm cập nhật thời gian chung để dùng lại
    const updateTimeData = () => {
        if (!audioRef.current) return;
        
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        // Cập nhật thanh seekbar (width %)
        if (seekBar.current && duration > 0) {
            seekBar.current.style.width = (Math.floor(current / duration * 100)) + "%";
        }

        // Cập nhật số phút/giây
        setTime({
            currentTime: {
                second: Math.floor(current % 60),
                minute: Math.floor(current / 60)
            },
            totalTime: {
                // Nếu chưa load xong duration (NaN) thì lấy 0
                second: isNaN(duration) ? 0 : Math.floor(duration % 60),
                minute: isNaN(duration) ? 0 : Math.floor(duration / 60)
            }
        });
    };

    // UseEffect xử lý play/pause khi đổi track
    useEffect(() => {
        if (audioRef.current) {
            if (playStatus) {
                audioRef.current.play().catch(error => console.log("Playback error:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [track, playStatus]); 

    // UseEffect lắng nghe sự kiện audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // 1. Khi nhạc đang chạy (Time Update)
        audio.ontimeupdate = updateTimeData;

        // 2. QUAN TRỌNG: Khi metadata tải xong (Loaded Metadata)
        // Sự kiện này đảm bảo Duration hiện ngay khi file nhạc vừa load xong
        audio.onloadedmetadata = updateTimeData;
        
        // Cleanup function (tốt cho performance)
        return () => {
            audio.ontimeupdate = null;
            audio.onloadedmetadata = null;
        }
    }, [audioRef]); // Bỏ track ra khỏi đây để tránh re-bind không cần thiết

    const contextValue = {
        audioRef, seekBg, seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId, previous, next, seekSong,
        handleVolumeChange,
        songsData, setSongsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;