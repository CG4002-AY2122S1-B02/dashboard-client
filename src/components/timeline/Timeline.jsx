import './timeline.scss'
import React, { useState, useEffect } from 'react';

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
    const [count, setCount] = useState(6)
    const speed = 1
    const interval = 1

    const generateList = (seconds) => {
        var out = []
        for (let i = 0; i < seconds; i += interval) {
            out.push(i)
        }

        return out
    }

    const [timeLabel, setTimeLabel] = useState(generateList(18)) //13


    useEffect(() => {
        const interval = setInterval(() => unitTime(), speed * 6000);
        return () => {
            clearInterval(interval);
        };
    });

    const unitTime = () => {
        setCurrentTime(currentTime + 1)
        const newTimeLabel = timeLabel.map((value) => value < count && value >= count - 6 ? value + 12 : value)
        setCount((count + 6))
        setTimeLabel(newTimeLabel)
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
