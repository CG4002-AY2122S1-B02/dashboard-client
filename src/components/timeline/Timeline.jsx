import './timeline.scss'
import React, { useState, useEffect } from 'react';
import Dance, { Dancing } from '../dance/Dance';
import { PathStreamAll } from '../../config';
import { TimelineDivisionHeight, TimelineDivisionSeconds, TimelineHeight, START_OFFSET_MS, BUFFER_MAX_LENGTH } from '../live/Live';

// https://stackoverflow.com/questions/23618713/create-a-uniform-scrolling-speed-on-a-click-event
// plan is to scroll slowly at speed set

const OFFSET = -5 //200 

const Lines = (props) => {
    //____________________Dance Move Stream__________________________
    const [buffer, setBuffer] = useState([
        // { "epochMs": Date.now(), "name": "start", "accuracy": "0" },
        // { "epochMs": Date.now(), "name": "START", "accuracy": 0 },
        // { "epochMs": Date.now(), "name": "Push Back", "accuracy": 0 },
        // { "epochMs": Date.now() + 1000, "name": "Scarecrow", "accuracy": 1 },
        // { "epochMs": Date.now() + 2000, "name": "Dab", "accuracy": 3 },
        // { "epochMs": Date.now() + 3000, "name": "Snake", "accuracy": 2 },
        // { "epochMs": Date.now() + 4000, "name": "Window360", "accuracy": 3 },
        // { "epochMs": Date.now() + 5000, "name": "James Bond", "accuracy": 1 },
        // { "epochMs": Date.now() + 6000, "name": "Cowboy", "accuracy": 1 },
        // { "epochMs": Date.now() + 7000, "name": "Mermaid", "accuracy": 2 },
    ])
    const [danceMove, setDanceMove] = useState({ "epochMs": Date.now(), "name": "start", "accuracy": 0 })
    // const [danceMove, setDanceMove] = useState({ "epochMs": Date.now(), "name": "START", "accuracy": 0 })

    useEffect(() => {
        const socket = new WebSocket(PathStreamAll + props.stream)
        socket.onopen = () => {
        }

        socket.onmessage = (e) => {
            const danceMove = e.data.split("|")
            setDanceMove({
                "epochMs": parseInt(danceMove[0]),
                "name": danceMove[1],
                "accuracy": danceMove[2]
            })
        }

        return () => {
            socket.close();
        };
    }, [props.stream])

    useEffect(() => {
        function getBuffer(b) {
            if (b.length >= BUFFER_MAX_LENGTH) {
                return [b[0], ...(b.slice(2)), danceMove]
            } else {
                return [...b, danceMove]
            }
        }

        setBuffer(b => (
            getBuffer(b)
        ))

        console.log(danceMove)
        console.log(String(Date.now() + START_OFFSET_MS) + " - " + danceMove.epochMs + " = " + String(Date.now() + START_OFFSET_MS - danceMove.epochMs + "| -> "))// + String(buffer.length > 0 ? danceMove.epochMs - buffer[0].epochMs : "")))
    }, [danceMove])

    useEffect(() => {
        setBuffer([{ "epochMs": Date.now(), "name": "start", "accuracy": 0 }])
    }, [props.timelineState])

    return (
        <div className="lines" >
            {props.timeLabel.map((l) => (
                <Line timelineState={props.timelineState} label={l} buffer={buffer} />
            ))}
        </div>
    )
}

const Line = (props) => {
    const label = props.label
    const start_time = (props.buffer.length > 0 ? props.buffer[0].epochMs : Date.now()) + START_OFFSET_MS
    var pixelsOffsetRelativeLine = null
    var finalDanceMove = null

    var dancingStartTime = 3634667450000 //this is the most likely dance start time to this line
    var isDancing = false

    for (let i = 1; i < props.buffer.length; i++) {
        const danceMove = props.buffer[i]


        // records closest start time before label
        if (danceMove.name === "START" &&
            danceMove.epochMs < start_time + label * TimelineDivisionSeconds * 1000 -
            TimelineDivisionSeconds * 1000) {
            dancingStartTime = danceMove.epochMs
            isDancing = true
        }

        // if closest end time before label is more than start time => not dancing
        if (danceMove.name !== "START" &&
            danceMove.epochMs < start_time + label * TimelineDivisionSeconds * 1000 //- TimelineDivisionSeconds * 1000
            && danceMove.epochMs > dancingStartTime) {
            isDancing = false
        }

        // if START is detected twice, don't display dancing in between them
        if (dancingStartTime < start_time + label * TimelineDivisionSeconds * 1000 &&
            danceMove.name === "START" && danceMove.epochMs > dancingStartTime) {
            isDancing = false
        }

        // // if got predicted
        // if (danceMove.name !== "END" && danceMove.name !== "START" &&
        // danceMove.epochMs < start_time + label * TimelineDivisionSeconds * 1000 +
        // TimelineDivisionSeconds * 1000) {
        //     predictionTime = danceMove.epochMs
        // }

        //check if start_time + label - x < epochMs < start_time + label + x  
        if (start_time + label * TimelineDivisionSeconds * 1000 < danceMove.epochMs &&
            danceMove.epochMs <= start_time + label * TimelineDivisionSeconds * 1000 +
            TimelineDivisionSeconds * 1000) {
            //if it is, find exact position and break
            pixelsOffsetRelativeLine = (danceMove.epochMs - start_time - label *
                1000 * TimelineDivisionSeconds) * TimelineDivisionHeight / 1000 * TimelineDivisionSeconds
            finalDanceMove = danceMove
            if (danceMove.name !== "END") { //if name === END, it will get replaced
                break
            }
        }
    }

    const currentStartTimestamp = props.buffer.length > 0 && pixelsOffsetRelativeLine != null ? finalDanceMove.epochMs - props.buffer[0].epochMs : 0

    return (
        <div className={"line" + (props.timelineState ? " move" : "")}
            style={{
                bottom: props.bottom,
                marginBottom: String(TimelineDivisionHeight - 20) + "px"
            }}>
            <Dancing isDancing={isDancing} />
            <div className="line-label"> {SecToTime(label + (START_OFFSET_MS / 1000), false)} </div>
            <div className="line-real"></div>
            {pixelsOffsetRelativeLine != null ?
                // <div className="dance-special-wrapper">
                //     {
                //         finalDanceMove.name !== "START" ?
                //             <div className="dancing-wrapper end" style={{ bottom: 0 }}>
                //                 <Dancing isDancing={true} />
                //             </div> : <span></span>
                //     }
                <Dance name={finalDanceMove.name}
                    accuracy={finalDanceMove.accuracy} position={pixelsOffsetRelativeLine + OFFSET}
                    text={SecToTime(currentStartTimestamp / 1000, true) + " " + String(currentStartTimestamp % 1000) + "ms"} />
                // </div>
                : <span></span>}

            {/* <Dance name="START" position={50 + OFFSET} /> */}

        </div>
    )
}

export function SecToTime(duration, spacing) {
    if (duration < 0) {
        return "-"
    }

    var seconds = Math.floor((duration) % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

    hours = (hours === 0) ? "" : hours + "h";
    minutes = (hours === "" && minutes === 0) ? "" : (minutes + "m");

    if (spacing) {
        return hours + " " + minutes + " " + seconds + "s";
    }

    return hours + minutes + seconds + "s";
}

export default function Timeline(props) {
    return (
        <div className="timeline"
            style={{ height: TimelineHeight }}
        >
            <Lines timeLabel={props.timeLabels} stream={props.stream} timelineState={props.timelineState} />
        </div>
    )
}
