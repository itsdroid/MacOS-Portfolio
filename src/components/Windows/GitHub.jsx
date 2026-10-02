import MacWindow from "./MacWindow";
import gitHubData from "../../assets/GitHub.json";
import "./GitHub.css";

const GitCard = ({ data = {
    id: 1,
    image: "",
    title: "",
    description: "",
    tags: [],
    repoLink: "",
    demoLink: ""
} }) => {
    return <div className="card">
        <img src={data.image} alt={data.title + "image"} />
        {/* <div className="imagebox"></div> */}
        <h1> {data.title} </h1>
        <p className="description"> {data.description} </p>
        <div className="tags">
            {data.tags.map((tag) => {
                return <p key={tag} className="tag"> {tag} </p>
            })}
        </div>

        <div className="urls">
            <a href={data.repoLink} className="repoLink"> Repository </a>
            <a href={data.demoLink} className="demoLink"> Demo link</a>
        </div>
    </div>
}


export default function GitHub({setWindowState}) {
    return (
        <MacWindow setWindowState={setWindowState} windowName="Github">
            <div className="cards">
                {gitHubData.map((project) => {
                    return <GitCard key={project.id} data={project} />
                })}
            </div>
        </MacWindow>
    );
}