import MacWindow from "./MacWindow";
import TerminalComponent from 'react-console-emulator';
const Terminal = TerminalComponent.default || TerminalComponent;
import "./CLI.css";

export default function CLI({ setWindowState }) {
    const commands = {
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        },

        whoami: {
            description: 'Display the current user.',
            usage: 'whoami',
            fn: () => 'shubham'
        },

        pwd: {
            description: 'Print the current working directory.',
            usage: 'pwd',
            fn: () => '/Users/shubham/portfolio'
        },


        date: {
            description: 'Display the current date and time.',
            usage: 'date',
            fn: () => new Date().toString()
        },

        ls: {
            description: 'List files in the current directory.',
            usage: 'ls',
            fn: () => 'about.md  projects  skills.json  contact.txt  resume.pdf'
        },

        cd: {
            description: 'Change the current directory.',
            usage: 'cd <directory>',
            fn: (directory) => `Changed directory to ${directory || '~'}`
        },

        cat: {
            description: 'Display the contents of a file.',
            usage: 'cat <file>',
            fn: (file) => {
                const files = {
                    'about.md': 'Web Developer • UI Designer • Graphic Designer',
                    'contact.txt': 'shubhampopalghat77@gmail.com',
                    'skills.json': 'React, Node.js, MongoDB, Figma, Python'
                }

                return files[file] ?? `cat: ${file}: No such file`
            }
        },

        neofetch: {
            description: 'Display system information.',
            usage: 'neofetch',
            fn: () => `
       ███████╗██╗  ██╗
       ██╔════╝██║  ██║
       ███████╗███████║
       ╚════██║██╔══██║
       ███████║██║  ██║
       ╚══════╝╚═╝  ╚═╝

       User: shubham
       Role: Web Developer
       Stack: MERN
       OS: Linux
       Status: Available
    `
        },

        skills: {
            description: 'Display technical skills.',
            usage: 'skills',
            fn: () => `
    Frontend : React.js, Next.js, Tailwind CSS
    Backend  : Node.js, Express.js
    Database : MongoDB, PostgreSQL
    Design   : Figma, Photoshop, Illustrator
    Tools    : Git, GitHub, Postman
    `
        },

        projects: {
            description: 'Display featured projects.',
            usage: 'projects',
            fn: () => `
    01  Portfolio Website
    02  WashMate
    03  Smart Electricity Theft Detection
    04  Wireless EV Charging
    `
        },

        experience: {
            description: 'Display professional experience.',
            usage: 'experience',
            fn: () => `
    Web Developer Lead
    Google Developer Groups SCOE
    2025 - 2026

    Graphic Designer
    Google Developer Groups SCOE
    2024 - 2025

    Graphic Designer
    ECell SCOE Pune
    2024 - 2025
    `
        },

        contact: {
            description: 'Display contact information.',
            usage: 'contact',
            fn: () => `
    Email : shubhampopalghat77@gmail.com
    Phone : +91 8149604513
    `
        },

        github: {
            description: 'Open GitHub profile.',
            usage: 'github',
            fn: () => 'Opening GitHub...'
        },

        resume: {
            description: 'Display resume information.',
            usage: 'resume',
            fn: () => 'Loading resume...'
        },

        about: {
            description: 'Display information about the developer.',
            usage: 'about',
            fn: () => `
    Shubham Popalghat

    Web Developer • UI Designer • Graphic Designer

    Building creative digital experiences
    with code, design and technology.
    `
        },

        exit: {
            description: "Exit the terminal",
            usage: "exit",

            fn: () => {
                setWindowState((state) => ({ ...state, CLI: false }));
            }
        }
    }

    return <MacWindow setWindowState={setWindowState} windowName="CLI">
        <div className="cli-window"
            style={{ height: "100%", width: "100%" }}>
            <Terminal
                className="react-console-emulator-div"
                style={{ height: '100%', maxHeight: '100%', minHeight: '100%', borderRadius: 0 }}
                commands={commands}
                welcomeMessage={`
╔════════════════════════════════════════════════════════════╗
║              Welcome to Shubham's Portfolio CLI!          ║
╚════════════════════════════════════════════════════════════╝

Hello! 👋 Welcome to my interactive portfolio.

I'm Shubham Popalghat — a Web Developer who enjoys building creative digital
experiences with code and design.

You can explore my portfolio directly from the terminal.

Type 'help' to see all available commands, or try:

• about      → Learn more about me
• skills     → Explore my technical skills
• projects   → Check out my work, etc


Happy exploring! 🚀`
                }
                promptLabel={'me@React:~$'}
                promptLabelStyle={{ color: "#00ff00" }}
            />
        </div>
    </MacWindow>
}