import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import "./Musicbar.css";

export default function Musicbar({ playerRef: externalPlayerRef } = {}) {
    const internalPlayerRef = useRef(null);
    const playerRef = externalPlayerRef || internalPlayerRef;
    const [isPlaying, setIsPlaying] = useState(false);
    const [thumbnail, setThumbnail] = useState("https://img.youtube.com/vi/Gri9jASfpnE/hqdefault.jpg");
    const [songTitle, setSongTitle] = useState("Chandni Aaya Hai Tera Deewana");
    const [author, setAuthor] = useState("Salman Khan");
    const [duration, setDuration] = useState(382);
    const [playTime, setPlayTime] = useState(0);

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            listType: "playlist",
            list: "PLxgQoQL27ZHYFbMOmb0mIEQyDp2fBsglu",
            autoplay: 0,
        },
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    function onReady(event) {
        playerRef.current = event.target;
        try {
            const videoData = playerRef.current.getVideoData();
            if (videoData) {
                if (videoData.title) setSongTitle(videoData.title);
                if (videoData.author) setAuthor(videoData.author);
                if (videoData.video_id) {
                    setThumbnail(`https://img.youtube.com/vi/${videoData.video_id}/hqdefault.jpg`);
                }
            }
            const currentTime = playerRef.current.getCurrentTime();
            const videoDuration = playerRef.current.getDuration();
            if (typeof currentTime === "number") setPlayTime(currentTime);
            if (typeof videoDuration === "number" && videoDuration > 0) setDuration(videoDuration);
        } catch (err) {
            console.error("Error reading video data:", err);
        }
    }

    function onStateChange(event) {
        if (event.data === 1) {
            setIsPlaying(true);
            try {
                const videoData = event.target.getVideoData();
                if (videoData) {
                    if (videoData.video_id) {
                        setThumbnail(`https://img.youtube.com/vi/${videoData.video_id}/hqdefault.jpg`);
                    }
                    if (videoData.title) setSongTitle(videoData.title);
                    if (videoData.author) setAuthor(videoData.author);
                }
                const currentTime = event.target.getCurrentTime();
                const videoDuration = event.target.getDuration();
                if (typeof currentTime === "number") setPlayTime(currentTime);
                if (typeof videoDuration === "number" && videoDuration > 0) setDuration(videoDuration);
            } catch (err) {
                console.error("Error onStateChange:", err);
            }
        } else {
            setIsPlaying(false);
        }
    }

    function togglePlayPause() {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    }

    function nextSong() {
        if (!playerRef.current) return;
        playerRef.current.nextVideo();
    }

    function previousSong() {
        if (!playerRef.current) return;
        playerRef.current.previousVideo();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && isPlaying && typeof playerRef.current.getCurrentTime === "function") {
                const currentTime = playerRef.current.getCurrentTime();
                setPlayTime(currentTime);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isPlaying, playerRef]);

    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (playTime / duration) * 100)) : 0;

    return (
        <div className="musicbar-wrapper">
            <YouTube
                className="youtube-player"
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
            />

            <div className="musicbar">
                <img
                    className={`album-art ${isPlaying ? "spin-slow" : ""}`}
                    src={thumbnail}
                    alt="Album Art"
                />

                <div className="music-info">
                    <h2 className="song-title" title={songTitle}>
                        {songTitle}
                    </h2>

                    <h3 className="song-author" title={author}>
                        {author}
                    </h3>

                    {/* Single progress bar: removes duplicate progress track/fill */}
                    <div className="progress-wrapper">
                        <div className="progress-track" />
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div
                            className="progress-thumb"
                            style={{ left: `${progressPercent}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            step="0.5"
                            value={playTime || 0}
                            onChange={(e) => {
                                const newTime = Number(e.target.value);
                                setPlayTime(newTime);
                                if (playerRef.current && typeof playerRef.current.seekTo === "function") {
                                    playerRef.current.seekTo(newTime, true);
                                }
                            }}
                            className="progress-input"
                            aria-label="Seek track position"
                        />
                    </div>

                    <div className="time-display">
                        <span>{formatTime(playTime)}</span>
                        <span> / </span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="music-controls">
                    <button
                        type="button"
                        onClick={previousSong}
                        className="skip-button"
                        aria-label="Previous track"
                        title="Previous track"
                    >
                        <img
                            className="skip-icon"
                            src="/YTMusic/skip-back.svg"
                            alt="Previous"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={togglePlayPause}
                        className="play-button"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        <img
                            className={`play-icon ${!isPlaying ? "play-icon-offset" : ""}`}
                            src={isPlaying ? "/YTMusic/pause.svg" : "/YTMusic/play.svg"}
                            alt={isPlaying ? "Pause" : "Play"}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={nextSong}
                        className="skip-button"
                        aria-label="Next track"
                        title="Next track"
                    >
                        <img
                            className="skip-icon"
                            src="/YTMusic/skip-forward.svg"
                            alt="Next"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}