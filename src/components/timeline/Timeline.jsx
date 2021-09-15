import './timeline.scss'
import React, { useState, useEffect } from 'react';
import Dance from '../dance/Dance';

// https://stackoverflow.com/questions/23618713/create-a-uniform-scrolling-speed-on-a-click-event
// plan is to scroll slowly at speed set

const BUFFER_MAX_LENGTH = 5

const Lines = (props) => {
    //____________________Dance Move Stream__________________________
    const [buffer, setBuffer] = useState([])
    const [danceMove, setDanceMove] = useState({
        "epochMs": Date.now(), "name": "start", "accuracy": "MSG"
    })

    useEffect(() => {
        const socket = new WebSocket(props.stream)
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
    }, [danceMove])

    useEffect(() => {
        console.log(buffer)
    }, [buffer])

    //_______________________________________________________________


    return (
        <div className="lines" >
            {props.timeLabel.map((l) => (
                <Line label={l} buffer={buffer} />
            ))}
        </div>
    )
}

const Line = (props) => {
    const label = props.label
    const start_time = props.buffer.length > 0 ? props.buffer[0].epochMs : Date.now()
    var pixelsOffsetRelativeLine = null
    var finalDanceMove = null
    for (let i = 1; i < props.buffer.length; i++) {
        const danceMove = props.buffer[i]
        //check if start_time + label - x < epochMs < start_time + label + x  

        // console.log(String(danceMove.epochMs) + "|" + String(start_time) + "|" + String(label * 1000))
        if (start_time + label * 1000 - 500 < danceMove.epochMs &&
            danceMove.epochMs < start_time + label * 1000 + 500) {
            //if it is, find exact position and break
            pixelsOffsetRelativeLine = (danceMove.epochMs - start_time - label * 1000) * 50 / 1000
            finalDanceMove = danceMove
            break
        }
    }


    return (
        <div className="line move" style={{ bottom: props.bottom }}>
            <div className="line-label"> {sToTime(label)} </div>
            <div className="line-real"></div>
            {pixelsOffsetRelativeLine != null ?
                <Dance name={finalDanceMove.name}
                    accuracy={finalDanceMove.accuracy} position={pixelsOffsetRelativeLine} />
                : <span></span>}
        </div>
    )
}

function sToTime(duration) {
    if (duration < 0) {
        return "-"
    }

    var seconds = Math.floor((duration) % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

    hours = (hours === 0) ? "" : hours + "h";
    minutes = (hours === 0 && minutes === 0) ? "" : (minutes + "m");

    return hours + minutes + seconds + "s";
}

export default function Timeline(props) {
    return (
        <div className="timeline"
            style={{ height: 300 }}>
            <Lines timeLabel={props.timeLabels} stream={props.stream} />
        </div>
    )
}
