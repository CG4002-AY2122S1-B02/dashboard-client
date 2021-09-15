import "./live.scss"
import React, { useState, useEffect } from 'react';
import { PathUser1Stream, PathUser2Stream, PathUser3Stream, PositionStream } from '../../config';
import UserCard from '../usercard/UserCard';

export const TimelineWindow = 50

const UserCards = (props) => {
    //Positon____________________________________________
    const [position, setPosition] = useState('123')

    useEffect(() => {
        const socketPosition = new WebSocket(PositionStream)
        socketPosition.onopen = () => {
            setPosition("123")
        }

        socketPosition.onmessage = (e) => {
            setPosition(e.data)
        }

    }, [])
    const splitPosition = position.split("")
    //____________________________________________________

    return (
        <div className="user-cards">
            <UserCard position={splitPosition[0]} name={"Michael"} sensor_set={1} stream={PathUser1Stream} timeLabels={props.timeLabels} />
            <UserCard position={splitPosition[1]} name={"Sanath"} sensor_set={2} stream={PathUser2Stream} timeLabels={props.timeLabels} />
            <UserCard position={splitPosition[2]} name={"Jerry"} sensor_set={3} stream={PathUser3Stream} timeLabels={props.timeLabels} />
        </div>
    )
}

export default function Live() {

    //Timer_______________________________________________
    const speed = 1
    const interval = 1
    const generateList = (seconds, displacement) => {
        var out = []
        for (let i = displacement; i < seconds - displacement; i += interval) {
            out.push(i)
        }

        return out
    }
    const [TimerUnitTime, setTimerUnitTime] = useState(0)
    const [TimeLabels, setTimeLabels] = useState(generateList(18, -6)) //13

    useEffect(() => {
        const interval = setInterval(() => unitTime(), speed * 6000);
        return () => {
            clearInterval(interval);
        };
    });


    const unitTime = () => {
        setTimerUnitTime(TimerUnitTime + 1)
        const newTimeLabels = TimeLabels.map((value) => value < TimerUnitTime * 6 && value >= TimerUnitTime * 6 - 6 ? value + 12 : value)
        setTimeLabels(newTimeLabels)
    }
    //_____________________________________________________

    return (
        <div className="live">
            <UserCards timeLabels={TimeLabels} />
        </div>
    );
}
