import { useState } from 'react';
import Home from './Home.jsx';
import './App.css';
import Dock from './components/Dock.jsx';
import Nav from './components/Nav.jsx';
import MacWindow from './components/Windows/MacWindow.jsx';
import { MusicProvider } from './contexts/MusicContext.jsx';
import GitHub from './components/Windows/GitHub.jsx';
import Note from './components/Windows/Note.jsx';
import Resume from './components/Windows/Resume.jsx';
import Spotify from './components/Windows/Spotify.jsx';
import CLI from './components/Windows/CLI.jsx';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github.js';
import { resume } from 'react-dom/server';
import Terminal from 'react-console-emulator';
import Linkedin from './components/Windows/Linkedin.jsx';
import Clock from './components/Windows/Clock.jsx';
import YTMusic from './components/Windows/YTMusic/YTMusic.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import TimeWidget from './components/Widgets/TimeWidget.jsx';

function App() {
  const [windowState, setWindowState] = useState({
    Github: false,
    Spotify: false,
    Resume: false,
    CLI: false,
    Note: false,
    Linkedin: false,
    Clock: false,
    YTMusic: false
  });

  return (
    <MusicProvider>
      <MusicPlayer />
      <main>
        <Nav />
        {windowState.Github && <GitHub setWindowState={setWindowState} />}
        {windowState.Spotify && <Spotify setWindowState={setWindowState} />}
        {windowState.Resume && <Resume setWindowState={setWindowState} />}
        {windowState.CLI && <CLI setWindowState={setWindowState} />}
        {windowState.Note && <Note setWindowState={setWindowState} />}
        {windowState.Clock && <Clock setWindowState={setWindowState} />}
        {windowState.YTMusic && <YTMusic setWindowState={setWindowState} />}
        <TimeWidget/>
        
        <Dock windowState={windowState} setWindowState={setWindowState} />
      </main>
    </MusicProvider>
  )
}

export default App;
