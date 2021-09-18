import './dance.scss'
import StarIcon from '@material-ui/icons/Star';

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

    const Rating = (props) => {
        const accuracy = parseInt(props.accuracy)
        switch (accuracy) {
            case 0:
                return (
                    <span><StarOnOff on={false} /><StarOnOff on={false} /><StarOnOff on={false} /></span>
                )
            case 1:
                return (
                    <span><StarOnOff on={true} /><StarOnOff on={false} /><StarOnOff on={false} /></span>
                )
            case 2:
                return (
                    <span><StarOnOff on={true} /><StarOnOff on={true} /><StarOnOff on={false} /></span>
                )
            case 3:
                return (
                    <span><StarOnOff on={true} /><StarOnOff on={true} /><StarOnOff on={true} /></span>
                )
            default:
                return <span></span>
        }
    }

    const StarOnOff = (props) => (
        <span style={props.on ? { color: 'inherit' } : { color: '#222222' }}>
            <StarIcon color="inherit" />
        </span>
    )

    if (name === "") {
        return <span></span>
    }

    return (
        <div className="dance"
            style={{ backgroundImage: gradientText, bottom: position }}
        >
            <span>{name}<span> </span><Rating accuracy={accuracy} /></span>
        </div>
    )
}
