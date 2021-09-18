import './userCard.scss'
import Timeline from '../timeline/Timeline';
import Dance from '../dance/Dance';
import { useState, useEffect } from 'react';
import { PathStreamAll, PathDanceMove, PathAccuracy } from '../../config';
import StarIcon from '@material-ui/icons/Star';

export default function UserCard(props) {
    const { swap, position, name, sensor_set } = props
    const [latestDance, setLatestDance] = useState({ "name": "", "accuracy": -1 },)
    const [totalAccuracy, setTotalAccuracy] = useState(0)

    useEffect(() => {
        const DanceMoveNamesocket = new WebSocket(PathStreamAll + props.stream + PathDanceMove)
        DanceMoveNamesocket.onopen = () => {
        }

        DanceMoveNamesocket.onmessage = (e) => {
            setLatestDance({
                "name": e.data,
                "accuracy": -1
            })
        }
    }, [props.stream])

    useEffect(() => {
        const DanceMoveAccuracysocket = new WebSocket(PathStreamAll + props.stream + PathAccuracy)
        DanceMoveAccuracysocket.onopen = () => {
        }

        DanceMoveAccuracysocket.onmessage = (e) => {
            console.log(e.data)
            setTotalAccuracy(a => a + parseInt(e.data))
        }
    }, [props.stream])

    return (
        <div className={"user-card pos" + String(swap ? position : sensor_set)}>
            <div className="card">
                <span>Position {position}</span>
                <h1>{name}</h1>
                <code>{"Sensor Set " + sensor_set}</code>
                <br />
                <div className="stat-panel">
                    <div className="last-dance-move">
                        <strong>Latest Move:</strong>
                        <div className="dance-external">
                            {
                                latestDance === "" ? <span></span> :
                                    <Dance name={latestDance.name} accuracy={latestDance.accuracy} />
                            }
                        </div>
                    </div>
                    <div className="score">
                        <strong> {totalAccuracy} </strong><StarIcon />
                    </div>
                </div>
                <Timeline stream={props.stream} timeLabels={props.timeLabels} />
            </div>
        </div>
    )
}
