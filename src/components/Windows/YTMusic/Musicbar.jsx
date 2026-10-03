/**
 * Musicbar — the UI panel inside the YTMusic window.
 * The actual YouTube player lives in <MusicPlayer /> (always mounted at App level).
 * This component only reads/writes MusicContext state.
 */
import { useMusic } from "../../../contexts/MusicContext.jsx";
import "./Musicbar.css";

export default function Musicbar() {
    const {
        playerRef,
        isPlaying,
        thumbnail,
        songTitle,
        author,
        duration,
        playTime,
        setPlayTime,
    } = useMusic();

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${String(s).padStart(2, "0")}`;
    };

    const togglePlayPause = () => {
        if (!playerRef.current) return;
        isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    };
    const nextSong     = () => playerRef.current?.nextVideo();
    const previousSong = () => playerRef.current?.previousVideo();

    const progressPercent = duration > 0
        ? Math.min(100, Math.max(0, (playTime / duration) * 100))
        : 0;

    return (
        <div className="musicbar-wrapper">
            <div className="musicbar">
                <img
                    className={`album-art ${isPlaying ? "spin-slow" : ""}`}
                    src={thumbnail}
                    alt="Album Art"
                />

                <div className="music-info">
                    <h2 className="song-title" title={songTitle}>{songTitle}</h2>
                    <h3 className="song-author" title={author}>{author}</h3>

                    <div className="progress-wrapper">
                        <div className="progress-track" />
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                        <div className="progress-thumb" style={{ left: `${progressPercent}%` }} />
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            step="0.5"
                            value={playTime || 0}
                            onChange={(e) => {
                                const t = Number(e.target.value);
                                setPlayTime(t);
                                playerRef.current?.seekTo(t, true);
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
                    <button type="button" onClick={previousSong} className="skip-button" aria-label="Previous">
                        <img className="skip-icon" src="/YTMusic/skip-back.svg" alt="Previous" />
                    </button>

                    <button type="button" onClick={togglePlayPause} className="play-button" aria-label={isPlaying ? "Pause" : "Play"}>
                        <img
                            className={`play-icon ${!isPlaying ? "play-icon-offset" : ""}`}
                            src={isPlaying ? "/YTMusic/pause.svg" : "/YTMusic/play.svg"}
                            alt={isPlaying ? "Pause" : "Play"}
                        />
                    </button>

                    <button type="button" onClick={nextSong} className="skip-button" aria-label="Next">
                        <img className="skip-icon" src="/YTMusic/skip-forward.svg" alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    );
}