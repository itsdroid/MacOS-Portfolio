import MacWindow from "./MacWindow";
import "./Resume.css";
export default function Resume({setWindowState}) {

    return <MacWindow setWindowState={setWindowState} windowName="Resume">
        <iframe src="./resume1.pdf"></iframe>
    </MacWindow>
}