import React, { createContext, useEffect, useRef, useState, ReactNode, RefObject } from "react";
import { songsData as defaultSongs } from "../assets/assets"; 

// 1. Định nghĩa các Interfaces cho Data
export interface Song {
    id: number | string; // ID có thể là số hoặc chuỗi
    name: string;
    image: string;
    desc: string;
    file: string; // Đường dẫn file nhạc
    duration: string;
}

interface TimeFormat {
    second: number;
    minute: number;
}

interface TimeStatus {
    currentTime: TimeFormat;
    totalTime: TimeFormat;
}

// 2. Định nghĩa kiểu dữ liệu cho Context Value
interface PlayerContextValue {
    audioRef: RefObject<HTMLAudioElement>;
    seekBg: RefObject<HTMLDivElement>;
    seekBar: RefObject<HTMLDivElement>;
    track: Song;
    setTrack: React.Dispatch<React.SetStateAction<Song>>;
    playStatus: boolean;
    setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
    time: TimeStatus;
    setTime: React.Dispatch<React.SetStateAction<TimeStatus>>;
    play: () => void;
    pause: () => void;
    playWithId: (id: number | string) => Promise<void>;
    previous: () => Promise<void>;
    next: () => Promise<void>;
    seekSong: (e: React.MouseEvent<HTMLDivElement>) => Promise<void>;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    songsData: Song[] | null;
    setSongsData: React.Dispatch<React.SetStateAction<Song[] | null>>;
}

// 3. Khởi tạo Context với giá trị mặc định là null (sẽ được Provider điền vào)
export const PlayerContext = createContext<PlayerContextValue | null>(null);

interface ProviderProps {
    children: ReactNode;
}

const PlayerContextProvider = (props: ProviderProps) => {
    // 4. Type cho Refs (Quan trọng để TS biết đây là thẻ Audio hay Div)
    const audioRef = useRef<HTMLAudioElement>(null);
    const seekBg = useRef<HTMLDivElement>(null);
    const seekBar = useRef<HTMLDivElement>(null);

    // State
    const [songsData, setSongsData] = useState<Song[] | null>(null);
    // Ép kiểu defaultSongs[0] thành Song để đảm bảo type safety
    const [track, setTrack] = useState<Song>(null); 
    const [playStatus, setPlayStatus] = useState<boolean>(false);
    
    // State thời gian
    const [time, setTime] = useState<TimeStatus>({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    }

    const playWithId = async (id: number | string) => {
        const sourceData = songsData ;
        const song = sourceData.find((item) => item.id === id);

        if (song && audioRef.current) {
            await setTrack(song);
            console.log("check song play");
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        // Cần songsData để biết thứ tự bài
        const sourceData = songsData || (defaultSongs as unknown as Song[]);
        
        const currentIndex = sourceData.findIndex(item => item.id === track.id);
        if (currentIndex > 0) {
            await setTrack(sourceData[currentIndex - 1]);
            setPlayStatus(true);
        }
    }

    const next = async () => {
        const sourceData = songsData || (defaultSongs as unknown as Song[]);
        
        const currentIndex = sourceData.findIndex(item => item.id === track.id);
        if (currentIndex < sourceData.length - 1) {
            await setTrack(sourceData[currentIndex + 1]);
            setPlayStatus(true);
        }
    }

    // 5. Type cho Event (React.MouseEvent) để lấy được nativeEvent.offsetX
    const seekSong = async (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current && audioRef.current.duration && seekBg.current) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }

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
                second: isNaN(duration) ? 0 : Math.floor(duration % 60),
                minute: isNaN(duration) ? 0 : Math.floor(duration / 60)
            }
        });
    };

    // UseEffect xử lý play/pause khi đổi track
    useEffect(() => {
        if (audioRef.current) {
            if (playStatus) {
                // Thêm catch error để tránh lỗi "play() request was interrupted"
                audioRef.current.play().catch(error => console.error("Playback error:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [track, playStatus]); 

    // UseEffect lắng nghe sự kiện audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.ontimeupdate = updateTimeData;
        audio.onloadedmetadata = updateTimeData;
        
        return () => {
            audio.ontimeupdate = null;
            audio.onloadedmetadata = null;
        }
    }, [audioRef]);

    const contextValue: PlayerContextValue = {
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