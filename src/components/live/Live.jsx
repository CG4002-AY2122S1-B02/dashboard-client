import "./live.scss"
import React, { useState, useEffect } from 'react';
import { User1Port, User2Port, User3Port, PositionStream } from '../../config';
import UserCard from '../usercard/UserCard';

export const TimelineWindow = 50

const PositionChange = false

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
            <UserCard swap={PositionChange} position={splitPosition[0]} name={"Michael"} sensor_set={1} stream={User1Port} timeLabels={props.timeLabels} />
            <UserCard swap={PositionChange} position={splitPosition[1]} name={"Sanath"} sensor_set={2} stream={User2Port} timeLabels={props.timeLabels} />
            <UserCard swap={PositionChange} position={splitPosition[2]} name={"Jerry"} sensor_set={3} stream={User3Port} timeLabels={props.timeLabels} />
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
    const [TimerUnitTime, setTimerUnitTime] = useState(-1)
    const [TimeLabels, setTimeLabels] = useState(generateList(18, -6)) //13

    useEffect(() => {
        const interval = setInterval(() => unitTime(), speed * 3000);
        return () => {
            clearInterval(interval);
        };
    });

    //optimise this instead of buffering the lag
    const unitTime = () => {
        setTimerUnitTime(t => (t + 1))
        const newTimeLabels = TimeLabels.map((value) => value < TimerUnitTime * 3 && value >= TimerUnitTime * 3 - 3 ? value + 12 : value)
        setTimeLabels(newTimeLabels)

        //Trying to optimise__________________________________________

        // const startIndex = ((TimerUnitTime + 1) % 6) * 3
        // const newTimeLabels = TimeLabels
        // newTimeLabels[startIndex] += 12
        // newTimeLabels[startIndex + 1] += 12
        // newTimeLabels[startIndex + 2] += 12
        // setTimeLabels(newTimeLabels)

        // setTimeLabels(tls => [...tls.slice(0, startIndex),
        // tls[startIndex] + 12,
        // tls[startIndex + 1] + 12,
        // tls[startIndex + 2] + 12,
        // ...tls.slice(startIndex + 3)
        // ])
    }
    //_____________________________________________________

    return (
        <div className="live">
            <UserCards timeLabels={TimeLabels} />
        </div>
    );
}
