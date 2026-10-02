import MacWindow from "../MacWindow";
import Musicbar from "./Musicbar.jsx";
import { useRef } from "react";
import "./YTMusic.css";

export default function YTMusic({ setWindowState }) {
    const playerRef = useRef(null);

    return (
        <MacWindow
            setWindowState={setWindowState}
            windowName="YTMusic"
        >
            <main className="yt-music">
                <div
                    className="yt-background yt-background-mobile"
                    style={{
                        backgroundImage: "url('/YTMusic/bg-mobile.webp')"
                    }}
                />

                <div
                    className="yt-background yt-background-desktop"
                    style={{
                        backgroundImage: "url('/YTMusic/bg.webp')"
                    }}
                />

                <div className="yt-overlay" />

                <Musicbar playerRef={playerRef} />
            </main>
        </MacWindow>
    );
}