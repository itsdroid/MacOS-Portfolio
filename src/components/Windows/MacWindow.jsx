import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import './MacWindow.css';

let topZ = 900;
let openCount = 0;
export const focusHandlers = {};

export default function ({ children, height = "60vh", width = "50vw", minWidth = "550", minHeight = "400", setWindowState, windowName }) {
    const offset = useRef(openCount++ % 6 * 24).current;
    const [zIndex, setZIndex] = useState(topZ++);

    function bringToFront() {
        setZIndex(++topZ);
    }

    useEffect(() => {
        focusHandlers[windowName] = bringToFront;
        return () => { delete focusHandlers[windowName]; };
    });

    return (
        <Rnd
            style={{ zIndex }}
            onMouseDown={bringToFront}
            default={{
                width: width,
                height: height,
                x: 450 + offset,
                y: 100 + offset
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