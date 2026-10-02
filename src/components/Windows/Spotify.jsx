import MacWindow from "./MacWindow";
// import "./Spotify.css";

export default function Spotify({setWindowState}) {
    return <MacWindow width="30vw" setWindowState={setWindowState} windowName="Spotify">
      <iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/artist/5r3wPya2PpeTTsXsGhQU8O?utm_source=generator&theme=0&si=31247ae5aa104fa1" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </MacWindow>
}