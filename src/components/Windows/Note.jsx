import MacWindow from "./MacWindow";
import { useState, useEffect } from "react";
import './Note.css';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";


export default function Note({setWindowState}) {
    const [markdown, setMarkdown] = useState(null);
    useEffect(() => {
        fetch('/note.txt')
            .then(res => res.text())
            .then(text => setMarkdown(text));
    }, []);

    return <MacWindow setWindowState={setWindowState} windowName="Note">
        <div className="note-window">
            {markdown ? <SyntaxHighlighter language="typescript" style={atomOneDarkReasonable}>{markdown}</SyntaxHighlighter> : <p>Loading...</p>}
        </div>
    </MacWindow>
}