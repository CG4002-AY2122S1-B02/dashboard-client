import "./live.scss"
import React, { useState, useEffect } from 'react';
import { User1Port, User2Port, User3Port, PositionStream, PathStreamCommand } from '../../config';
import UserCard from '../usercard/UserCard';

// https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors

export const TimelineWindow = 50

const PositionChange = true

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
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[0]} name={"Michael"} sensor_set={1} stream={User1Port} timeLabels={props.timeLabels} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[1]} name={"Sanath"} sensor_set={2} stream={User2Port} timeLabels={props.timeLabels} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[2]} name={"Jerry"} sensor_set={3} stream={User3Port} timeLabels={props.timeLabels} />
        </div>
    )
}

export default function Live() {

    //Timer_______________________________________________
    const speed = 1
    const timeline_interval = 1
    const generateList = (seconds, displacement) => {
        var out = []
        for (let i = displacement; i < seconds - displacement; i += timeline_interval) {
            out.push(i)
        }

        return out
    }
    const [TimerUnitTime, setTimerUnitTime] = useState(-1)
    const [timelineState, setTimelineState] = useState(false)
    const [TimeLabels, setTimeLabels] = useState(generateList(18, -6)) //13

    useEffect(() => {
        const interval = setInterval(() => unitTime(), speed * 3000);
        return () => {
            clearInterval(interval);
        };
    });

    //optimise this instead of buffering the lag
    const unitTime = () => {
        if (!timelineState) return
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

    const handleSubmit = (start) => {
        if (start) {
            setTimelineState(true)
            setTimerUnitTime(-1)
            setTimeLabels(generateList(18, -6))
        } else {
            setTimelineState(false)
            setTimerUnitTime(-1)
            setTimeLabels(generateList(18, -6))
        }
        const payload = {
            start: start,
            username1: "michael",
            username2: "sanath",
            username3: "jerry",
            session_timestamp: 0,
        }


        fetch(PathStreamCommand, {
            method: "post",
            mode: 'cors',
            // credentials: "same-origin",
            // mode: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(() => {
            console.log('handle post')


            //stop / start the css animation, refresh
        })
    }


    return (
        <div className="live">
            <button onClick={() => handleSubmit(true)}><h2>START</h2></button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => handleSubmit(false)}><h2>STOP</h2></button>
            <UserCards timeLabels={TimeLabels} timelineState={timelineState} />
        </div>
    );
}
