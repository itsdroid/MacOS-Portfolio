import { useEffect } from "react";
import YouTube from "react-youtube";
import { useMusic } from "../contexts/MusicContext.jsx";

const PLAYLIST_ID = "PLO9GbnRBWLJ0";


const opts = {
    height: "0",
    width: "0",
    playerVars: {
        listType: "playlist",
        list: PLAYLIST_ID,
        autoplay: 0,
    },
};

export default function MusicPlayer() {
    const {
        playerRef,
        isPlaying,
        setIsPlaying,
        setThumbnail,
        setSongTitle,
        setAuthor,
        setDuration,
        setPlayTime,
    } = useMusic();

    function syncMeta(target) {
        try {
            const data = target.getVideoData?.();
            if (data?.video_id) setThumbnail(`https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`);
            if (data?.title) setSongTitle(data.title);
            if (data?.author) setAuthor(data.author);
            const dur = target.getDuration?.();
            if (typeof dur === "number" && dur > 0) setDuration(dur);
            const cur = target.getCurrentTime?.();
            if (typeof cur === "number") setPlayTime(cur);
        } catch (e) { }
    }

    function onReady(e) {
        playerRef.current = e.target;
        syncMeta(e.target);
    }

    function onStateChange(e) {
        if (e.data === 1) {
            setIsPlaying(true);
            syncMeta(e.target);
        } else {
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        const id = setInterval(() => {
            if (playerRef.current && isPlaying) {
                const cur = playerRef.current.getCurrentTime?.();
                if (typeof cur === "number") setPlayTime(cur);
            }
        }, 500);
        return () => clearInterval(id);
    }, [isPlaying, playerRef, setPlayTime]);

    return (
        <div style={{ position: "fixed", bottom: 0, left: 0, width: 0, height: 0, overflow: "hidden", zIndex: -1 }}>
            <YouTube opts={opts} onReady={onReady} onStateChange={onStateChange} />
        </div>
    );
}
