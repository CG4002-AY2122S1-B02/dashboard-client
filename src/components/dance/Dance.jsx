import './dance.scss'
import StarIcon from '@material-ui/icons/Star';
// import { useTimer } from "react-use-precision-timer";

export function Dancing(props) {
    const height = props.height == null ? 50 : props.height

    return (
        <div className="dancing" style={props.isDancing ? { opacity: 0.6, height: height } : { opacity: 0, height: height }}>
            <div className={"beam grey"}>
            </div>
        </div>
    )
}

export function DanceStart(props) {
    return (
        <div className="dance-special-wrapper">
            <div className="dancing-wrapper" style={{ top: 43 + props.position }}> {/*-60*/}
                <Dancing isDancing={true} height={50 - props.position} />
            </div>
            <div className="dance-start" style={{ top: props.position - 3 }}> {/*-58*/}
                <div className="start-outline square">
                    <div className="start square">
                        <div className="text">
                            START
                            <br />
                            {
                                props.text ?
                                    <span className="subtext positive">{props.text}</span>
                                    : <span></span>
                            }
                            {/* <br />
                             <span className="subtext negative">-{props.negative}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DanceEnd(props) {
    return (
        <div className="dance-end" style={{ top: props.position - 5 }}>
            <div className="loading-container">
                {/* <img src="assets/loading.gif" alt="" /> */}

                <div className="loading-bead x1"></div>
                <div className="loading-bead x2"></div>
                <div className="loading-bead x3"></div>
            </div>
            <div className="timing">
                {/* 3m 2s - 3m 18s */}
            </div>
        </div>
    )
}

export default function Dance(props) {
    const { name, accuracy, position, text } = props

    if (name === "START") {
        return <DanceStart position={position} text={text} />
    } else if (name === "END") {
        return <DanceEnd position={position} />
    }

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
        case "START":
            gradientText = "none"
            break
        case "X":
        case "WRONG":
            gradientText = "linear-gradient(to right,#777777,50%, #777777)"
            break

        default:
            if (accuracy === -1) {
                gradientText = "linear-gradient(to right,#333333,50%, #554455)"
            } else {
                gradientText = "none"
            }
    }

    if (accuracy === -4002) {
        gradientText = "none"
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
            style={{ backgroundImage: gradientText, top: position }}
        >
            <span>{name}<span> </span><Rating accuracy={accuracy} /></span>
        </div>
    )
}
