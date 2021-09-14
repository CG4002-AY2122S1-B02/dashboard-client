import './dance.scss'

export default function Dance(props) {
    const { name, accuracy, position } = props
    const isMsg = accuracy === "MSG"
    const gradientText = isMsg ?
        "linear-gradient(to right,#a71b5c,50%, #a40e8e "
        : "linear-gradient(to right,#4A13AE," + String(accuracy) + "%, #9c115e "

    return (
        <div className="dance"
            style={{ backgroundImage: gradientText, bottom: position }}
        >
            <div className="fill" style={{ width: accuracy }}></div>
            <span>{name + (isMsg ? "" : " (" + String(accuracy) + "%)")}</span>
        </div>
    )
}
