import "./live.scss"
import React, { useState, useEffect } from 'react';
import { User1Port, User2Port, User3Port, PathStreamCommand, PathPositionStream, PathGetCurrentSession, emptySessionData } from '../../config';
import UserCard from '../usercard/UserCard';
import Controller from "../controller/Controller";
import Error from "../error/Error";
import PreliminaryAnalysis from "../preliminaryAnalysis/Analysis";


// https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors

export const TimelineWindow = 50

const PositionChange = true

const UserCards = (props) => {
    //Positon____________________________________________
    const [position, setPosition] = useState('123')

    useEffect(() => {
        const socketPosition = new WebSocket(PathPositionStream)
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
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[0]} name={props.account.user1} sensor_set={1} stream={User1Port} timeLabels={props.timeLabels} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[1]} name={props.account.user2} sensor_set={2} stream={User2Port} timeLabels={props.timeLabels} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[2]} name={props.account.user3} sensor_set={3} stream={User3Port} timeLabels={props.timeLabels} />
        </div>
    )
}

export default function Live(props) {
    const { loggedIn, master, user1, user2, user3 } = props.account

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
    const [CurrentSessionData, setCurrentSessionData] = useState(emptySessionData)

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

    const handleSubmit = () => {
        if (!timelineState) {
            setTimelineState(true)
            setTimerUnitTime(-1)
            setTimeLabels(generateList(18, -6))
        } else {
            setTimelineState(false)
            setTimerUnitTime(-1)
            setTimeLabels(generateList(18, -6))
        }
        const payload = {
            start: !timelineState,
            account_name: master,
            username1: user1,
            username2: user2,
            username3: user3,
            session_timestamp: Date.now(),
        }


        fetch(PathStreamCommand, {
            method: "post",
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(() => {
            console.log('handle post')
            if (timelineState) {
                //first retrieve the upload data then show the Evaluator

                //if we want to stop this, open the Upload manager
                console.log("Stopped")

                fetch(PathGetCurrentSession, {
                    method: "get",
                    mode: 'cors',
                }).then((r) => {
                    r.json().then(data => {
                        console.log(data)
                        setCurrentSessionData(data)
                    });
                    if (r.status === 200) {
                    } else {
                    }
                })
                setCurrentSessionData(emptySessionData)
            }


            //stop / start the css animation, refresh
        })
    }

    if (!loggedIn || user1 === "" || user2 === "" || user3 === "") return (
        <Error />
    )

    return (
        <div className="live">
            <UserCards timeLabels={TimeLabels} timelineState={timelineState} account={props.account} />
            <Controller toggleDance={handleSubmit} dancing={!timelineState} />
            {CurrentSessionData.empty === true ? <div></div> :
                <PreliminaryAnalysis account={props.account}
                    setCurrentSessionData={setCurrentSessionData} CurrentSessionData={CurrentSessionData} />
            }
        </div>
    );
}
