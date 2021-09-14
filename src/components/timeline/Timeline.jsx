import './timeline.scss'
import React, { useState, useEffect, useRef } from 'react';

// https://stackoverflow.com/questions/23618713/create-a-uniform-scrolling-speed-on-a-click-event
// plan is to scroll slowly at speed set

const Line = (props) => {
    return (
        <div className="line move" style={{ bottom: props.bottom }}>
            <div className="line-label"> {props.label} </div>
            <div className="line-real"></div>
        </div>
    )
}

function sToTime(duration) {
    // var milliseconds = Math.floor((duration % 1000) / 100),
    var seconds = Math.floor((duration) % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

    hours = (hours === 0) ? "" : hours + "h";
    minutes = (hours === 0 && minutes === 0) ? "" : (minutes + "m");

    return hours + minutes + seconds + "s";
}

export default function Timeline(props) {
    const [currentTime, setCurrentTime] = useState(0)
    const [timeLabel, setTimeLabel] = useState([0, 1, 2, 3, 4, 5, 6])
    const timeWindow = 10
    const speed = 1
    const linesRef = useRef(0)
    const interval = 1

    useEffect(() => {
        const interval = setInterval(() => unitTime(), speed * 1000);
        return () => {
            clearInterval(interval);
        };
    });

    const unitTime = () => {
        // console.log(currentTime + "-" + (currentTime + timeWindow))
        // setCurrentTime(currentTime + 1)
        setTimeLabel([timeLabel[0] + interval,
        timeLabel[1] + interval,
        timeLabel[2] + interval,
        timeLabel[3] + interval,
        timeLabel[4] + interval,
        timeLabel[5] + interval,
        timeLabel[6] + interval])
    }

    return (
        <div className="timeline"
            style={{ height: 300 }}>
            <div className="lines" >
                {timeLabel.map((l) => (
                    <Line label={sToTime(l)} />
                ))}
            </div>
        </div>
    )
}
