import { useState } from "react";
import { useMusic } from "../../contexts/MusicContext.jsx";
import "./DynamicIsland.css";

function fmt(s) {
    if (!s || isNaN(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function DynamicIsland() {
    const [open, setOpen] = useState(false);
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

    const progress = duration > 0 ? Math.min(100, (playTime / duration) * 100) : 0;
    const remaining = duration - playTime;

    const toggle = () => {
        if (!playerRef.current) return;
        isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    };
    const next = () => playerRef.current?.nextVideo();
    const prev = () => playerRef.current?.previousVideo();
    const seek = (e) => {
        const t = Number(e.target.value);
        setPlayTime(t);
        playerRef.current?.seekTo(t, true);
    };

    return (
        <div
            className={`di${open ? " di--open" : ""}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* ── Pill row – always visible ─────────────────────── */}
            <div className="di__pill">
                {isPlaying && !open && (
                    <span className="di__bars" aria-hidden="true">
                        <i /><i /><i /><i />
                    </span>
                )}
            </div>

            {/* ── Expanded body – slides in/out ─────────────────── */}
            <div className="di__body">
                <div className="di__inner">

                    {/* Top: art + info + remaining */}
                    <div className="di__top">
                        <img className="di__art" src={thumbnail} alt="Album Art" />
                        <div className="di__meta">
                            <p className="di__song">{songTitle}</p>
                            <p className="di__artist">{author}</p>
                        </div>
                        <span className="di__remain">-{fmt(remaining)}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="di__prog">
                        <span className="di__t">{fmt(playTime)}</span>
                        <div className="di__track">
                            <div className="di__fill" style={{ width: `${progress}%` }} />
                            <input
                                type="range" min="0" max={duration || 100}
                                step="0.5" value={playTime || 0}
                                onChange={seek} className="di__range"
                                aria-label="Seek"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="di__ctrls">
                        {/* Shuffle */}
                        <button className="di__btn" aria-label="Shuffle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 3 21 3 21 8" />
                                <line x1="4" y1="20" x2="21" y2="3" />
                                <polyline points="21 16 21 21 16 21" />
                                <line x1="15" y1="15" x2="21" y2="21" />
                            </svg>
                        </button>

                        {/* Prev */}
                        <button className="di__btn" onClick={prev} aria-label="Previous">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="19 20 9 12 19 4 19 20" />
                                <rect x="5" y="4" width="2.5" height="16" rx="1.2" />
                            </svg>
                        </button>

                        {/* Play / Pause */}
                        <button className="di__btn di__btn--play" onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="5" y="3" width="5" height="18" rx="1.5" />
                                    <rect x="14" y="3" width="5" height="18" rx="1.5" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="6 3 20 12 6 21 6 3" />
                                </svg>
                            )}
                        </button>

                        {/* Next */}
                        <button className="di__btn" onClick={next} aria-label="Next">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 4 15 12 5 20 5 4" />
                                <rect x="16.5" y="4" width="2.5" height="16" rx="1.2" />
                            </svg>
                        </button>

                        {/* AirPlay */}
                        <button className="di__btn" aria-label="AirPlay">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
                                <polygon fill="currentColor" stroke="none" points="12 15 17 21 7 21 12 15" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}