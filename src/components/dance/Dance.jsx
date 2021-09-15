import './dance.scss'

export default function Dance(props) {
    const { name, accuracy, position } = props

    var gradientText = ""
    switch (name) {
        case "Push Back": //pink and purple
            gradientText = "linear-gradient(to right,#a71b5c,50%, #a40e8e)"
            break
        case "Scarecrow": //brown and purple
            gradientText = "linear-gradient(to right,#A87000,50%, #FE4200)"
            break
        case "Dab": //blue and purple
            gradientText = "linear-gradient(to right,#4A13AE,50%, #9c115e)"
            break
        case "Snake": //green and yellow
            gradientText = "linear-gradient(to right,#167100,50%, #727200)"
            break
        case "Window360": //blue and light blue
            gradientText = "linear-gradient(to right,#242AB9,50%, #01B4B7)"
            break
        case "James Bond": //black and yellow/gold
            gradientText = "linear-gradient(to right,#B13060,50%, #B0954D)"
            break
        case "Cowboy":  //orange and yellow
            gradientText = "linear-gradient(to right,#757400,50%, #845000)"
            break
        case "Mermaid": //green and blue
            gradientText = "linear-gradient(to right,#007082,50%, #008000)"
            break

        default:
            gradientText = "linear-gradient(to right,#a71b5c,50%, #a40e8e)"
            break;
    }


    return (
        <div className="dance"
            style={{ backgroundImage: gradientText, bottom: position }}
        >
            {/* <div className="fill" style={{ width: accuracy }}></div> */}
            <span>{name}</span>
        </div>
    )
}
