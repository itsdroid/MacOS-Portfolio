import { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [thumbnail, setThumbnail] = useState("https://img.youtube.com/vi/Gri9jASfpnE/hqdefault.jpg");
    const [songTitle, setSongTitle] = useState("Chandni Aaya Hai Tera Deewana");
    const [author, setAuthor] = useState("Salman Khan");
    const [duration, setDuration] = useState(382);
    const [playTime, setPlayTime] = useState(0);

    return (
        <MusicContext.Provider value={{
            playerRef,
            isPlaying, setIsPlaying,
            thumbnail, setThumbnail,
            songTitle, setSongTitle,
            author, setAuthor,
            duration, setDuration,
            playTime, setPlayTime,
        }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    return useContext(MusicContext);
}
