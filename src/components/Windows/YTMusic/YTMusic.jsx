import MacWindow from "../MacWindow";
import Musicbar from "./Musicbar.jsx";
import "./YTMusic.css";

export default function YTMusic({ setWindowState }) {
    return (
        <MacWindow
            setWindowState={setWindowState}
            windowName="YTMusic"
        >
            <main className="yt-music">
                <div
                    className="yt-background yt-background-mobile"
                    style={{ backgroundImage: "url('/YTMusic/bg-mobile.webp')" }}
                />

                <div
                    className="yt-background yt-background-desktop"
                    style={{ backgroundImage: "url('/YTMusic/bg.webp')" }}
                />

                <div className="yt-overlay" />

                <Musicbar />
            </main>
        </MacWindow>
    );
}