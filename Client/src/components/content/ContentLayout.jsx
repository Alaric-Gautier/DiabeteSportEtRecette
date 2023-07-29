export default function ContentLayout(props) {
    return (
        <div className="column">
            <div className="recipe">
                <h2>{props.content.title}</h2>
                <p>{props.content.description}</p>
                {props.children}
            </div>
        </div>
    )
}