import "./live.scss"
import React, { useState, useEffect } from 'react';
import { PathUser1Stream, PathUser2Stream, PathUser3Stream, PositionStream } from '../../config';
import UserCard from '../usercard/UserCard';

export const TimelineWindow = 50

export default function Live() {
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

    return (
        <div className="live">
            <div className="user-cards">
                <UserCard position={splitPosition[0]} name={"Michael"} sensor_set={1} stream={PathUser1Stream} />
                <UserCard position={splitPosition[1]} name={"Sanath"} sensor_set={2} stream={PathUser2Stream} />
                <UserCard position={splitPosition[2]} name={"Jerry"} sensor_set={3} stream={PathUser3Stream} />
            </div>
        </div>
    );
}
