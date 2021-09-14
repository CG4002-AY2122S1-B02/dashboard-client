import "./live.scss"
import React, { useState, useEffect } from 'react';
import { PathDanceMove, PathUser1Stream, PathUser2Stream, PathUser3Stream, PositionStream } from '../../config';
import Timeline from "../timeline/Timeline";

export default function Live() {
    const [message1, setMessage1] = useState('')
    const [message2, setMessage2] = useState('')
    const [message3, setMessage3] = useState('')
    const [position, setPosition] = useState('')
    useEffect(() => {
        const socket1 = new WebSocket(PathUser1Stream + PathDanceMove)
        const socket2 = new WebSocket(PathUser2Stream)
        const socket3 = new WebSocket(PathUser3Stream)
        const socketPosition = new WebSocket(PositionStream)
        socketPosition.onopen = () => {
            setPosition("Connected")
        }

        socketPosition.onmessage = (e) => {
            setPosition(e.data)
        }
        socket1.onopen = () => {
            setMessage1("Connected")
        }

        socket1.onmessage = (e) => {
            setMessage1(e.data)
        }

        socket2.onopen = () => {
            setMessage2("Connected")
        }

        socket2.onmessage = (e) => {
            setMessage2(e.data)
        }

        socket3.onopen = () => {
            setMessage3("Connected")
        }

        socket3.onmessage = (e) => {
            setMessage3(e.data)
        }
    }, [])


    return (
        <div className="live">
            <h1>Position: {position}</h1>
            <h1>Message1: {message1}</h1>
            <h1>Message2: {message2}</h1>
            <h1>Message3: {message3}</h1>
            <Timeline scale="2" />
        </div>
    );
}
