import { Rnd } from "react-rnd";
import './MacWindow.css';
export default function ({ children, height = "60vh", width = "50vw", minWidth="550", minHeight="400" ,setWindowState, windowName }) {
    return (
        <Rnd
            default={{
                width: width,
                height: height,
                x: 10,
                y: 40
            }}
            minWidth={minWidth}
            minHeight={minHeight}
        >
            <div className="window">
                <div className="nav">
                    <div className="dots">
                        <div
                            onClick={() => { setWindowState(state => ({ ...state, [windowName]: false })) }}
                            className="dot red">
                        </div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                    </div>

                    <div className="title"> {windowName} </div>
                </div>

                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}