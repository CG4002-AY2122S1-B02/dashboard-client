import "./live.scss"
import React, { useState, useEffect } from 'react';
import { User1Port, User2Port, User3Port, PathStreamCommand, PathPositionStream, PathGetCurrentSession, emptySessionData } from '../../config';
import UserCard from '../usercard/UserCard';
import Controller from "../controller/Controller";
import Error from "../error/Error";
import PreliminaryAnalysis from "../preliminaryAnalysis/Analysis";
import { useTimer } from "react-use-precision-timer";
import Video from "../videoBg/Video";
// import window from "../../utils";

// https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors
// const { height, width } = window();
export const BUFFER_MAX_LENGTH = 7
export const START_OFFSET_MS = -2000
export const TimelineDivisionHeight = 50 //minimum 20
export const TimelineHeight = 400
export const TimelineDivisionSeconds = 1
const TimelineDivisionsInView = TimelineHeight / TimelineDivisionHeight //6
const TimelineDivisionsTotal = TimelineDivisionsInView * 3
const TimelineStartingLabel = -TimelineDivisionsInView
const TimelineDivisionsUnitUpdate = TimelineDivisionsInView / 2
const TimelineUpdateInterval = TimelineDivisionSeconds * 1000 * TimelineDivisionsUnitUpdate
//need change timeline.scss translateY(-600px) &  animate(timestart, 12s, to
// (-TimelineHeight * 2)px, (TimelineDivisionsInView * 2 * TimelineDivisionSeconds)s

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
        <div className="user-cards" style={{ paddingBottom: TimelineHeight + 290 }}>
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[0]} name={props.account.user1} sensor_set={1} stream={User1Port} timeLabels={props.timeLabels} toggleDance={props.toggleDance} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[1]} name={props.account.user2} sensor_set={2} stream={User2Port} timeLabels={props.timeLabels} toggleDance={props.toggleDance} />
            <UserCard timelineState={props.timelineState} swap={PositionChange} position={splitPosition[2]} name={props.account.user3} sensor_set={3} stream={User3Port} timeLabels={props.timeLabels} toggleDance={props.toggleDance} />
        </div>
    )
}

export default function Live(props) {
    const { loggedIn, master, user1, user2, user3 } = props.account

    //Timer_______________________________________________
    const generateList = () => {
        var out = []
        for (let i = TimelineStartingLabel; i < TimelineDivisionsTotal - TimelineStartingLabel; i += TimelineDivisionSeconds) {
            out.push(i)
        }

        return out
    }
    const [TimerUnitTime, setTimerUnitTime] = useState(-1)
    const [timelineState, setTimelineState] = useState(false)
    const [TimeLabels, setTimeLabels] = useState(generateList()) //13
    const [CurrentSessionData, setCurrentSessionData] = useState(emptySessionData)
    const [sessionName, setSessionNameX] = useState("~session " + new Date(Date.now()).toLocaleString())

    const CurrentSessionEmpty = CurrentSessionData.user_1 == null && CurrentSessionData.user_2 == null && CurrentSessionData.user_3 == null

    const setSessionName = (value) => {
        if (value !== "*") {
            setSessionNameX(value)
        } else {
            setSessionNameX("~session " + new Date(Date.now()).toLocaleString())
        }
    }

    const timer = useTimer({ delay: TimelineUpdateInterval, callback: () => unitTime() });

    const unitTime = () => {
        if (!timelineState) return
        setTimerUnitTime(t => (t + 1))
        const newTimeLabels = TimeLabels.map((value) => value < TimerUnitTime * TimelineDivisionsUnitUpdate &&
            value >= TimerUnitTime * TimelineDivisionsUnitUpdate - TimelineDivisionsUnitUpdate ? value + TimelineDivisionsInView * 2 : value)
        setTimeLabels(newTimeLabels)
    }
    //_____________________________________________________

    const handleSubmit = () => {
        if (!timelineState) {
            setTimelineState(true)
            setTimerUnitTime(-1)
            setTimeLabels(generateList())
            timer.start();

        } else {
            setTimelineState(false)
            setTimerUnitTime(-1)
            setTimeLabels(generateList())
            timer.stop();
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
            } else {
                //start

                if (sessionName.slice(0, 9) === "~session ") {
                    setSessionName("*")
                }
            }
            //stop / start the css animation, refresh
        })
    }

    if (!loggedIn || user1 === "" || user2 === "" || user3 === "") return (
        <Error />
    )

    return (
        <div className="live">
            <Video colorHex="#120011" source="spotlights" />
            <UserCards timeLabels={TimeLabels} timelineState={timelineState} account={props.account} toggleDance={CurrentSessionEmpty} />
            <Controller toggleDance={handleSubmit} dancing={!timelineState} sessionName={sessionName} setSessionName={setSessionName} />
            {CurrentSessionEmpty ? <div></div> :
                <PreliminaryAnalysis account={props.account} sessionName={sessionName} setSessionName={setSessionName}
                    setCurrentSessionData={setCurrentSessionData} CurrentSessionData={CurrentSessionData} />
            }
        </div>
    );
}
