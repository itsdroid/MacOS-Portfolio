import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../Dock.css';
import Linkedin from './Windows/Linkedin';
export default function Dock({ windowState, setWindowState }) {
    return (
        <div className="dock">
            <div className="dock-container">
                <li className="li-1"
                    onClick={() => { setWindowState(state => ({ ...state, Github: true })) }}
                >
                    {/* <div className="name">Finder</div> */}
                    <img className="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png" alt="" />
                </li>

                <li className="li-2"
                    onClick={() => { setWindowState(state => ({ ...state, CLI: true })) }}
                >
                    {/* <div className="name">Siri</div> */}
                    <img className="ico" src="/dock-icons/terminal.webp" alt="" />
                </li>

                <li className="li-3"
                    onClick={() => { setWindowState(state => ({ ...state, Github: true })) }}>
                    {/* <div className="name">LaunchPad</div> */}
                    <img style={{width:"95%" , height: "95%"}} className="ico" src="/dock-icons/github.svg" alt="" />
                </li>

    
                <li className="li-5"
                    onClick={() => { setWindowState(state => ({ ...state, Note: true })) }}>
                    {/* <div className="name">Notes</div> */}
                    <img className="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c849ec3735b52cef9_notes.png" alt="" />
                </li>

                <li className="li-6"
                    onClick={() => { setWindowState(state => ({ ...state, Resume: true })) }}
                >
                    {/* <div className="name">Reminders</div> */}
                    <img className="ico" src="/dock-icons/pdf.png" alt="" />
                </li>
              

                <li className="li-9"
                    onClick={() => { setWindowState(state => ({ ...state, Clock: true })) }}
                >
                    <div className="name">FaceTime</div>
                    <img className="ico" src="/dock-icons/clock.webp" alt="" />
                </li>
                <li className="li-10"
                    onClick={() => { setWindowState(state => ({ ...state, Spotify: true })) }}
                >
                    {/* <div className="name">Music</div> */}
                    <img style={{width:"87%" , height: "87%"}} className="ico" src="/dock-icons/spotify.webp" alt="" />
                </li>
                <li className="li-11"
                    onClick={() => { window.open("mailto:shubhampopalghat77@gmail.com") }}
                >
                    {/* <div className="name">Music</div> */}
                    <img className="ico" src="/dock-icons/mail.webp" alt="" />
                </li>


                <li className="li-13"
                    onClick={() => { window.open("https://www.linkedin.com/in/shubham-popalghat/") }}
                >
                    <div className="name">App Store</div>
                    <img className="ico" src="/dock-icons/linkedin.svg" alt="" />
                </li>

                <li className="li-14"
                    onClick={() => { setWindowState(state => ({ ...state, YTMusic: true })) }}
                >
                    <div className="name">Safari</div>
                    <img className="ico" src="/dock-icons/youtube_music.webp" alt="" />
                </li>

                <li className="li-bin li-15"
                    onClick={() => { setWindowState(state => ({ ...state, Github: true })) }}
                >
                    <div className="name">Bin</div>
                    <img className="ico ico-bin" src="https://www.icons101.com/icons/98/Yosemite_Flat_Icons_by_dtafalonso/128/Trash%20Empty.png" alt="" />
                </li>
            </div>
        </div>
    );
}